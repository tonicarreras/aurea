import {
  ExampleTagInputBasicDemo,
  ExampleTagInputLimitsDemo,
} from '../../../../demos/examples/tag-input.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Etiquetas',
    demoComponent: ExampleTagInputBasicDemo,
    code: `<au-form-field label="Habilidades" hint="Pulsa Enter o coma para añadir.">
  <au-tag-input />
</au-form-field>`,
  },
  {
    title: 'Con límites',
    description: 'Usa `maxTags` y `allowDuplicates` para restringir la entrada.',
    demoComponent: ExampleTagInputLimitsDemo,
    code: `<au-form-field label="Temas" hint="Hasta 5 etiquetas únicas.">
  <au-tag-input [maxTags]="5" [allowDuplicates]="false" />
</au-form-field>`,
  },
];
