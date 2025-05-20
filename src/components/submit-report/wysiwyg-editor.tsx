'use client';

import type { TextareaHTMLAttributes } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface WysiwygEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  error?: string;
}

export function WysiwygEditor({ label, id, error, className, ...props }: WysiwygEditorProps) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea
        id={id}
        className={cn("min-h-[200px] resize-y focus-visible:ring-primary", className, error && "border-destructive focus-visible:ring-destructive")}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
