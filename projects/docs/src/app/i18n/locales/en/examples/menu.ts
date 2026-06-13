import { MenuDemo } from '../../../../demos/previews/menu.preview';
import {
  ExampleMenuControlledDemo,
  ExampleMenuDisabledItemDemo,
  ExampleMenuPlacementDemo,
} from '../../../../demos/examples/menu.examples';
import type { ComponentDocExample } from '../../../types/example';

export const examples: ComponentDocExample[] = [
  {
    title: 'Actions menu',
    demoComponent: MenuDemo,
    code: `import { AuMenu, AuMenuItem, AuMenuTrigger, AuButton } from '@aurea-design-system/components';

<au-menu [(open)]="open">
  <button auButton auMenuTrigger>Actions</button>
  <au-menu-item (select)="onEdit()">Edit</au-menu-item>
  <au-menu-item>Share</au-menu-item>
</au-menu>`,
  },
  {
    title: 'Placement',
    description: 'Panel position relative to the trigger (`bottom`, `top`, `start`, `end`, …).',
    demoComponent: ExampleMenuPlacementDemo,
    code: `<au-menu [(open)]="open" placement="top">
  <button auButton auMenuTrigger>Actions</button>
  <au-menu-item>Edit</au-menu-item>
</au-menu>`,
  },
  {
    title: 'Disabled item',
    description:
      'Set `[disabled]="true"` on an item; it stays focusable only via skip in roving tabindex.',
    demoComponent: ExampleMenuDisabledItemDemo,
    code: `<au-menu>
  <button auButton auMenuTrigger>Actions</button>
  <au-menu-item>Edit</au-menu-item>
  <au-menu-item [disabled]="true">Archive (unavailable)</au-menu-item>
  <au-menu-item>Delete</au-menu-item>
</au-menu>`,
  },
  {
    title: 'Controlled open',
    description: 'Drive `[(open)]` from app logic — e.g. open from another button on the page.',
    demoComponent: ExampleMenuControlledDemo,
    code: `<button auButton type="button" (click)="open.set(true)">Open menu</button>
<au-menu [(open)]="open">
  <button auButton auMenuTrigger>Actions</button>
  <au-menu-item>Edit</au-menu-item>
</au-menu>`,
  },
];
