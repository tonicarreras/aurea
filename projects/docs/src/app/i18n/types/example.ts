import { Type } from '@angular/core';
import { type CodeLanguage } from '../../shared/code-highlight';

export interface ComponentDocExample {
  title: string;
  description?: string;
  demoComponent: Type<unknown>;
  code: string;
  language?: CodeLanguage;
}
