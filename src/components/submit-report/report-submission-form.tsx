'use client';

import { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WysiwygEditor } from './wysiwyg-editor'; // Simplified to Textarea
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useReports } from '@/contexts/report-context';
import { useToast } from '@/hooks/use-toast';
import { assessSeverity } from '@/ai/flows/ai-severity-assessment';
import type { SeverityLevel } from '@/lib/types';
import { SEVERITY_LEVELS } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Wand2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  targetAsset: z.string().min(3, 'Target/Asset must be at least 3 characters'),
  detailedDescription: z.string().min(50, 'Detailed description must be at least 50 characters'),
  supportingEvidenceUrls: z.string().url('Please enter a valid URL (optional)').optional().or(z.literal('')),
  finalSeverity: z.custom<SeverityLevel>(val => SEVERITY_LEVELS.includes(val as SeverityLevel), 'Please select a severity level'),
});

type ReportFormData = z.infer<typeof reportSchema>;

const STEPS = [
  { id: 1, name: 'Basic Information', fields: ['title', 'targetAsset'] },
  { id: 2, name: 'Detailed Description', fields: ['detailedDescription'] },
  { id: 3, name: 'Supporting Evidence', fields: ['supportingEvidenceUrls'] },
  { id: 4, name: 'Severity & Submit', fields: ['finalSeverity'] },
];

export function ReportSubmissionForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAiAssessing, setIsAiAssessing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ severity?: SeverityLevel; justification?: string } | null>(null);
  const [isSubmitting, startTransition] = useTransition();
  
  const { addReport } = useReports();
  const { toast } = useToast();

  const { control, handleSubmit, formState: { errors }, trigger, watch, setValue, getValues } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      finalSeverity: 'Medium', // Default severity
    },
  });

  const detailedDescriptionValue = watch('detailedDescription');

  const handleNextStep = async () => {
    const fieldsToValidate = STEPS[currentStep].fields as (keyof ReportFormData)[];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAiAssess = async () => {
    if (!detailedDescriptionValue || detailedDescriptionValue.length < 50) {
      toast({
        title: 'AI Assessment Error',
        description: 'Please provide a detailed description (at least 50 characters) before using AI assessment.',
        variant: 'destructive',
      });
      return;
    }
    setIsAiAssessing(true);
    setAiSuggestion(null);
    try {
      const result = await assessSeverity({ reportDetails: detailedDescriptionValue });
      setAiSuggestion({ severity: result.suggestedSeverity as SeverityLevel, justification: result.justification });
      setValue('finalSeverity', result.suggestedSeverity as SeverityLevel); // Pre-fill based on AI suggestion
      toast({
        title: 'AI Assessment Complete',
        description: `Suggested Severity: ${result.suggestedSeverity}. ${result.justification}`,
        variant: 'default',
      });
    } catch (error) {
      console.error('AI Severity Assessment Error:', error);
      toast({
        title: 'AI Assessment Failed',
        description: 'Could not get AI suggestion. Please assess severity manually.',
        variant: 'destructive',
      });
    } finally {
      setIsAiAssessing(false);
    }
  };

  const onSubmit = (data: ReportFormData) => {
    startTransition(() => {
      const reportToAdd = {
        title: data.title,
        targetAsset: data.targetAsset,
        detailedDescription: data.detailedDescription,
        supportingEvidenceUrls: data.supportingEvidenceUrls ? [data.supportingEvidenceUrls] : undefined,
        severity: data.finalSeverity,
        aiSuggestedSeverity: aiSuggestion?.severity,
        aiJustification: aiSuggestion?.justification,
      };
      addReport(reportToAdd);
      toast({
        title: 'Report Submitted!',
        description: 'Your vulnerability report has been successfully submitted.',
      });
      // Reset form or redirect (for now, just log and reset step)
      console.log('Form submitted:', reportToAdd);
      setCurrentStep(0);
      setAiSuggestion(null);
      // TODO: Reset form fields
    });
  };

  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Submit Vulnerability Report</CardTitle>
        <CardDescription>Follow the steps to detail the vulnerability.</CardDescription>
         <Progress value={progressValue} className="w-full mt-2" />
         <p className="text-sm text-muted-foreground mt-1 text-center">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].name}</p>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Vulnerability Title</Label>
                <Controller name="title" control={control} render={({ field }) => <Input id="title" placeholder="e.g., Cross-Site Scripting in Search Bar" {...field} />} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="targetAsset">Target/Asset Affected</Label>
                <Controller name="targetAsset" control={control} render={({ field }) => <Input id="targetAsset" placeholder="e.g., example.com/search or Mobile App v1.2" {...field} />} />
                {errors.targetAsset && <p className="text-sm text-destructive">{errors.targetAsset.message}</p>}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <Controller
                name="detailedDescription"
                control={control}
                render={({ field }) => (
                  <WysiwygEditor
                    id="detailedDescription"
                    label="Detailed Description & Steps to Reproduce"
                    placeholder="Provide a comprehensive description of the vulnerability, including how to reproduce it, potential impact, and any relevant technical details."
                    error={errors.detailedDescription?.message}
                    {...field}
                  />
                )}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <Label htmlFor="supportingEvidenceUrls">Supporting Evidence URL (Optional)</Label>
              <Controller name="supportingEvidenceUrls" control={control} render={({ field }) => <Input id="supportingEvidenceUrls" placeholder="e.g., https://example.com/proof.png or https://pastebin.com/xxxx" {...field} />} />
              {errors.supportingEvidenceUrls && <p className="text-sm text-destructive">{errors.supportingEvidenceUrls.message}</p>}
              <p className="text-xs text-muted-foreground mt-1">Link to screenshots, videos, code snippets, etc.</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-secondary/50">
                <h3 className="text-md font-semibold mb-2">AI Severity Assessment</h3>
                <Button type="button" onClick={handleAiAssess} disabled={isAiAssessing || !detailedDescriptionValue || detailedDescriptionValue.length < 50 } className="w-full mb-2">
                  {isAiAssessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Assess Severity with AI
                </Button>
                {!detailedDescriptionValue || detailedDescriptionValue.length < 50 && <p className="text-xs text-muted-foreground">Provide a detailed description first (min 50 chars).</p>}
                {aiSuggestion && (
                  <div className="mt-2 p-3 border rounded-md bg-background space-y-1">
                    <p className="text-sm"><strong>AI Suggestion:</strong> <span className={`font-semibold ${aiSuggestion.severity === 'Critical' || aiSuggestion.severity === 'High' ? 'text-destructive' : ''}`}>{aiSuggestion.severity}</span></p>
                    <p className="text-xs text-muted-foreground"><strong>Justification:</strong> {aiSuggestion.justification}</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="finalSeverity">Final Severity Level</Label>
                <Controller
                  name="finalSeverity"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="finalSeverity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEVERITY_LEVELS.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.finalSeverity && <p className="text-sm text-destructive">{errors.finalSeverity.message}</p>}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handlePrevStep} disabled={currentStep === 0 || isSubmitting}>
            Previous
          </Button>
          {currentStep < STEPS.length - 1 ? (
            <Button type="button" onClick={handleNextStep} disabled={isSubmitting}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || isAiAssessing}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
              Submit Report
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
