import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { AuCluster } from './au-cluster.directive';
import { AuSection } from './au-section.directive';
import { AuSplit } from './au-split.directive';
import { AuStack } from './au-stack.directive';

describe('layout primitives', () => {
  it('auStack sets data attributes and gap capability', async () => {
    @Component({
      imports: [AuStack],
      template: `<div auStack gap="lg" align="center" separator="solid">a</div>`,
    })
    class Host {}

    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const el = fix.nativeElement.querySelector('[data-au-stack]') as HTMLElement;
    expect(el.getAttribute('data-au-align')).toBe('center');
    expect(el.getAttribute('data-au-separator')).toBe('solid');
    expect(el.getAttribute('data-au-gap')).toBe('lg');
    expect(el.style.gap).toBe('var(--au-space-4)');
  });

  it('auCluster defaults to sm gap', async () => {
    @Component({
      imports: [AuCluster],
      template: `<div auCluster>b</div>`,
    })
    class Host {}

    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const el = fix.nativeElement.querySelector('[data-au-cluster]') as HTMLElement;
    expect(el.getAttribute('data-au-gap')).toBe('sm');
  });

  it('auSplit sets ratio custom property', async () => {
    @Component({
      imports: [AuSplit],
      template: `<div auSplit ratio="2:1">c</div>`,
    })
    class Host {}

    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const el = fix.nativeElement.querySelector('[data-au-split]') as HTMLElement;
    expect(el.style.getPropertyValue('--au-split-ratio')).toBe('2fr 1fr');
    expect(el.getAttribute('data-au-collapse')).toBe('sm');
  });

  it('auSection sets divider and padding capability', async () => {
    @Component({
      imports: [AuSection],
      template: `<div auSection padding="md" divider="top">d</div>`,
    })
    class Host {}

    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const el = fix.nativeElement.querySelector('[data-au-section]') as HTMLElement;
    expect(el.getAttribute('data-au-divider')).toBe('top');
    expect(el.getAttribute('data-au-padding')).toBe('md');
    expect(el.style.padding).toBe('var(--au-space-3)');
  });

  it('auSection accepts explicit padding none', async () => {
    @Component({
      imports: [AuSection],
      template: `<div auSection padding="none">d</div>`,
    })
    class Host {}

    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    await fix.whenStable();
    const el = fix.nativeElement.querySelector('[data-au-section]') as HTMLElement;
    expect(el.getAttribute('data-au-padding')).toBe('none');
    expect(el.style.padding).toBe('0px');
  });
});
