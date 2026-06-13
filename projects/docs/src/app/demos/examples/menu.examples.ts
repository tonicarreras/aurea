import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuButton, AuMenu, AuMenuItem, AuMenuTrigger } from '@aurea-design-system/components';
import { docsExampleLive } from '../../core/docs-example-live-copy';

@Component({
  selector: 'docs-example-menu-placement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <div class="docs-demo-row">
      <au-menu
        [(open)]="openBottom"
        placement="bottom"
      >
        <button auButton
          auMenuTrigger
          size="sm"
          variant="outline"
          type="button"
          >{{ t().placementBottom }}</button
        >
        <au-menu-item>{{ t().edit }}</au-menu-item>
        <au-menu-item>{{ t().duplicate }}</au-menu-item>
      </au-menu>
      <au-menu
        [(open)]="openTop"
        placement="top"
      >
        <button auButton
          auMenuTrigger
          size="sm"
          variant="outline"
          type="button"
          >{{ t().placementTop }}</button
        >
        <au-menu-item>{{ t().edit }}</au-menu-item>
        <au-menu-item>{{ t().duplicate }}</au-menu-item>
      </au-menu>
    </div>
  `,
})
export class ExampleMenuPlacementDemo {
  readonly t = docsExampleLive('menu');
  readonly openBottom = signal(false);
  readonly openTop = signal(false);
}

@Component({
  selector: 'docs-example-menu-disabled-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <au-menu [(open)]="open">
      <button auButton
        auMenuTrigger
        size="sm"
        variant="outline"
        type="button"
        >{{ t().trigger }}</button
      >
      <au-menu-item>{{ t().edit }}</au-menu-item>
      <au-menu-item [disabled]="true">{{ t().archiveDisabled }}</au-menu-item>
      <au-menu-item>{{ t().delete }}</au-menu-item>
    </au-menu>
  `,
})
export class ExampleMenuDisabledItemDemo {
  readonly t = docsExampleLive('menu');
  readonly open = signal(false);
}

@Component({
  selector: 'docs-example-menu-controlled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuMenu, AuMenuTrigger, AuMenuItem, AuButton],
  template: `
    <div class="docs-demo-stack">
      <button auButton
        size="sm"
        variant="secondary"
        type="button"
        (click)="open.set(true)"
        >{{ t().openProgrammatically }}</button
      >
      <au-menu [(open)]="open">
        <button auButton
          auMenuTrigger
          size="sm"
          variant="outline"
          type="button"
          >{{ t().trigger }}</button
        >
        <au-menu-item>{{ t().edit }}</au-menu-item>
        <au-menu-item>{{ t().share }}</au-menu-item>
      </au-menu>
    </div>
  `,
})
export class ExampleMenuControlledDemo {
  readonly t = docsExampleLive('menu');
  readonly open = signal(false);
}
