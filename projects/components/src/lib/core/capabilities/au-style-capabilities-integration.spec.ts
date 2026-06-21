import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AuGapCapability } from './au-gap-capability';
import { AuPaddingCapability } from './au-padding-capability';
import { AU_STYLE_DEFAULTS, AU_STYLE_NAMESPACE } from './au-style-tokens';
import { AuCluster } from '../../layout/au-cluster.directive';
import { AuSection } from '../../layout/au-section.directive';
import { AuSplit } from '../../layout/au-split.directive';
import { AuStack } from '../../layout/au-stack.directive';

async function assertLayoutContract(
  createHost: () => { new (): object },
  marker: string,
  capabilityAttr: string,
  defaultToken: string,
  namespaceVar: string,
  styleProp: 'gap' | 'padding',
): Promise<void> {
  await TestBed.configureTestingModule({ imports: [createHost()] }).compileComponents();
  const fix = TestBed.createComponent(createHost());
  await fix.whenStable();
  const el = fix.nativeElement.querySelector(`[${marker}]`) as HTMLElement;

  expect(el).toBeTruthy();
  expect(el.getAttribute(capabilityAttr)).toBe(defaultToken);
  expect(el.style[styleProp]).toContain(namespaceVar);
}

describe('style capability ↔ layout primitive contract', () => {
  it('auStack wires stack namespace, marker, and gap capability', async () => {
    @Component({ imports: [AuStack], template: `<div auStack></div>` })
    class Host {}

    await assertLayoutContract(
      () => Host,
      'data-au-stack',
      'data-au-gap',
      'md',
      '--au-stack-gap',
      'gap',
    );
  });

  it('auCluster wires cluster namespace, marker, and gap capability', async () => {
    @Component({ imports: [AuCluster], template: `<div auCluster></div>` })
    class Host {}

    await assertLayoutContract(
      () => Host,
      'data-au-cluster',
      'data-au-gap',
      'sm',
      '--au-cluster-gap',
      'gap',
    );
  });

  it('auSplit wires split namespace, marker, and gap capability', async () => {
    @Component({ imports: [AuSplit], template: `<div auSplit></div>` })
    class Host {}

    await assertLayoutContract(
      () => Host,
      'data-au-split',
      'data-au-gap',
      'lg',
      '--au-split-gap',
      'gap',
    );
  });

  it('auSection wires section namespace, marker, and padding capability', async () => {
    @Component({ imports: [AuSection], template: `<div auSection></div>` })
    class Host {}

    await assertLayoutContract(
      () => Host,
      'data-au-section',
      'data-au-padding',
      'lg',
      '--au-section-padding',
      'padding',
    );
  });

  it('auStack uses a direct spacing token when gap is explicit', async () => {
    @Component({
      imports: [AuStack],
      template: `<div
        auStack
        gap="xs"
      >
        a
      </div>`,
    })
    class Host {}

    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const el = fix.nativeElement.querySelector('[data-au-stack]') as HTMLElement;
    expect(el.style.gap).toBe('var(--au-space-1)');
    expect(el.style.gap).not.toContain('--au-stack-gap');
  });
});

describe('orphan AuGapCapability (unsupported)', () => {
  it('throws when AU_STYLE_NAMESPACE is missing', async () => {
    @Component({
      hostDirectives: [{ directive: AuGapCapability, inputs: ['gap'] }],
      template: '',
    })
    class OrphanHost {}

    await TestBed.configureTestingModule({ imports: [OrphanHost] }).compileComponents();
    expect(() => TestBed.createComponent(OrphanHost)).toThrow();
  });

  it('applies inline gap but not layout anatomy without a primitive marker', async () => {
    @Component({
      hostDirectives: [{ directive: AuGapCapability, inputs: ['gap'] }],
      providers: [
        { provide: AU_STYLE_NAMESPACE, useValue: 'stack' },
        { provide: AU_STYLE_DEFAULTS, useValue: { gap: 'md' } },
      ],
      template: '',
    })
    class OrphanWithProviders {}

    await TestBed.configureTestingModule({ imports: [OrphanWithProviders] }).compileComponents();
    const fix = TestBed.createComponent(OrphanWithProviders);
    await fix.whenStable();
    const el = fix.nativeElement as HTMLElement;

    expect(el.getAttribute('data-au-gap')).toBe('md');
    expect(el.style.gap).toContain('--au-stack-gap');
    expect(el.hasAttribute('data-au-stack')).toBe(false);
    expect(el.classList.contains('au-gap-capability')).toBe(true);
  });
});

describe('namespace isolation', () => {
  it('uses distinct namespace vars for stack vs cluster defaults', async () => {
    @Component({
      imports: [AuStack, AuCluster],
      template: `
        <div auStack></div>
        <div auCluster></div>
      `,
    })
    class Host {}

    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const stack = fix.nativeElement.querySelector('[data-au-stack]') as HTMLElement;
    const cluster = fix.nativeElement.querySelector('[data-au-cluster]') as HTMLElement;

    expect(stack.style.gap).toContain('--au-stack-gap');
    expect(cluster.style.gap).toContain('--au-cluster-gap');
    expect(stack.getAttribute('data-au-gap')).toBe('md');
    expect(cluster.getAttribute('data-au-gap')).toBe('sm');
  });
});

describe('orphan AuPaddingCapability (unsupported)', () => {
  it('throws when AU_STYLE_NAMESPACE is missing', async () => {
    @Component({
      hostDirectives: [{ directive: AuPaddingCapability, inputs: ['padding'] }],
      template: '',
    })
    class OrphanHost {}

    await TestBed.configureTestingModule({ imports: [OrphanHost] }).compileComponents();
    expect(() => TestBed.createComponent(OrphanHost)).toThrow();
  });
});
