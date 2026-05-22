import {
  ExampleChipFilledDemo,
  ExampleChipOutlineDemo,
  ExampleChipRemovableDemo,
} from '../../../../demos/examples/chip.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Filled',
    demoComponent: ExampleChipFilledDemo,
    code: `<au-chip label="Angular" />`,
  },
  {
    title: 'Outline',
    demoComponent: ExampleChipOutlineDemo,
    code: `<au-chip label="TypeScript" variant="outline" />`,
  },
  {
    title: 'Removible',
    demoComponent: ExampleChipRemovableDemo,
    code: `<au-chip label="Filtro activo" variant="accent" [removable]="true" />`,
  },
];
