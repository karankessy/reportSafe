import { config } from 'dotenv';
config();

import '@/ai/flows/ai-severity-assessment.ts';
import '@/ai/flows/vulnerability-report-summary.ts';
import '@/ai/flows/assess-vulnerability-severity.ts';