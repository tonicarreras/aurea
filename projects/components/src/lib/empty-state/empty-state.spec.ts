import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuButton } from '../button/button';
import { AuEmptyStateMedia } from './au-empty-state-media.directive';
import { AuEmptyState } from './empty-state';

describe('AuEmptyState', () => {
  let fixture: ComponentFixture<AuEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuEmptyState],
    }).compileComponents();
    fixture = TestBed.createComponent(AuEmptyState);
  });

  function host(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('renders title, description, and icon with region semantics', () => {
    fixture.componentRef.setInput('title', 'No items yet');
    fixture.componentRef.setInput('description', 'Create your first item to get started.');
    fixture.componentRef.setInput('icon', 'search');
    fixture.detectChanges();

    expect(host().getAttribute('role')).toBe('region');
    expect(host().getAttribute('data-au-size')).toBe('md');
    expect(host().getAttribute('aria-labelledby')).toMatch(/^au-empty-state-title-/);
    expect(
      host().querySelector('.au-empty-state__media[data-au-media-kind="icon"] au-icon'),
    ).not.toBeNull();
    expect(host().querySelector('h2.au-empty-state__title')?.textContent).toBe('No items yet');
    expect(host().querySelector('.au-empty-state__description')?.textContent).toBe(
      'Create your first item to get started.',
    );
  });

  it('omits icon when icon input is undefined', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.detectChanges();
    expect(host().querySelector('.au-empty-state__media')).toBeNull();
  });

  it('renders imageSrc when set', () => {
    fixture.componentRef.setInput('title', 'Inbox zero');
    fixture.componentRef.setInput('imageSrc', '/assets/inbox-empty.svg');
    fixture.componentRef.setInput('imageAlt', 'Empty inbox illustration');
    fixture.detectChanges();
    const img = host().querySelector(
      '.au-empty-state__media[data-au-media-kind="image"] img',
    ) as HTMLImageElement;
    expect(img.src).toContain('/assets/inbox-empty.svg');
    expect(img.alt).toBe('Empty inbox illustration');
    expect(host().querySelector('.au-empty-state__media')?.getAttribute('aria-hidden')).toBeNull();
  });

  it('treats empty imageAlt as decorative', () => {
    fixture.componentRef.setInput('title', 'Inbox zero');
    fixture.componentRef.setInput('imageSrc', '/assets/inbox-empty.svg');
    fixture.detectChanges();
    const img = host().querySelector('img') as HTMLImageElement;
    expect(img.alt).toBe('');
    expect(host().querySelector('.au-empty-state__media')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('ignores blank imageSrc', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('imageSrc', '   ');
    fixture.detectChanges();
    expect(host().querySelector('.au-empty-state__media')).toBeNull();
  });

  it('coerces null imageSrc to undefined', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('imageSrc', null as unknown as string);
    fixture.detectChanges();
    expect(host().querySelector('.au-empty-state__media')).toBeNull();
  });

  it('coerces null imageAlt to empty string', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('imageSrc', '/assets/empty.svg');
    fixture.componentRef.setInput('imageAlt', null as unknown as string);
    fixture.detectChanges();
    expect((host().querySelector('img') as HTMLImageElement).alt).toBe('');
  });

  it('prefers imageSrc over icon when both are set', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('icon', 'search');
    fixture.componentRef.setInput('imageSrc', '/assets/empty.svg');
    fixture.detectChanges();
    expect(host().querySelector('img')).not.toBeNull();
    expect(host().querySelector('au-icon')).toBeNull();
    expect(fixture.componentInstance.showImage()).toBe(true);
    expect(fixture.componentInstance.showIcon()).toBe(false);
  });

  it('evaluates media signals for projected content', () => {
    @Component({
      imports: [AuEmptyState, AuEmptyStateMedia],
      template: `
        <au-empty-state title="Empty">
          <span auEmptyStateMedia>Art</span>
        </au-empty-state>
      `,
    })
    class MediaSignalsHost {}

    const mediaFixture = TestBed.createComponent(MediaSignalsHost);
    mediaFixture.detectChanges();
    const emptyState = mediaFixture.debugElement.children[0].componentInstance as AuEmptyState;
    expect(emptyState.hasProjectedMedia()).toBe(true);
    expect(emptyState.showImage()).toBe(false);
    expect(emptyState.showIcon()).toBe(false);
  });

  it('projects custom media via auEmptyStateMedia', () => {
    @Component({
      imports: [AuEmptyState, AuEmptyStateMedia],
      template: `
        <au-empty-state title="No projects">
          <svg
            auEmptyStateMedia
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
            />
          </svg>
        </au-empty-state>
      `,
    })
    class MediaHost {}

    const mediaFixture = TestBed.createComponent(MediaHost);
    mediaFixture.detectChanges();
    const media = mediaFixture.nativeElement.querySelector(
      '.au-empty-state__media[data-au-media-kind="custom"] svg',
    ) as SVGElement | null;
    expect(media).not.toBeNull();
    expect(mediaFixture.nativeElement.querySelector('au-icon')).toBeNull();
  });

  it('prefers projected media over imageSrc and icon', () => {
    @Component({
      imports: [AuEmptyState, AuEmptyStateMedia],
      template: `
        <au-empty-state
          title="Empty"
          icon="search"
          imageSrc="/assets/empty.svg"
        >
          <span auEmptyStateMedia>Illustration</span>
        </au-empty-state>
      `,
    })
    class PriorityHost {}

    const priorityFixture = TestBed.createComponent(PriorityHost);
    priorityFixture.detectChanges();
    expect(
      priorityFixture.nativeElement.querySelector(
        '.au-empty-state__media[data-au-media-kind="custom"] span',
      )?.textContent,
    ).toBe('Illustration');
    expect(priorityFixture.nativeElement.querySelector('img')).toBeNull();
    expect(priorityFixture.nativeElement.querySelector('au-icon')).toBeNull();
  });

  it('omits title and aria-labelledby when title is blank', () => {
    fixture.componentRef.setInput('title', '   ');
    fixture.componentRef.setInput('description', 'Still here');
    fixture.detectChanges();
    expect(host().querySelector('.au-empty-state__title')).toBeNull();
    expect(host().getAttribute('aria-labelledby')).toBeNull();
    expect(host().querySelector('.au-empty-state__description')?.textContent).toBe('Still here');
  });

  it('omits description when blank', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('description', '');
    fixture.detectChanges();
    expect(host().querySelector('.au-empty-state__description')).toBeNull();
  });

  it('applies size on the host', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    expect(host().getAttribute('data-au-size')).toBe('lg');
  });

  it('renders h3 title when headingLevel is 3', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('headingLevel', 3);
    fixture.detectChanges();
    expect(host().querySelector('h3.au-empty-state__title')).not.toBeNull();
    expect(host().querySelector('h2.au-empty-state__title')).toBeNull();
  });

  it('renders h4 title when headingLevel is 4', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.componentRef.setInput('headingLevel', 4);
    fixture.detectChanges();
    expect(host().querySelector('h4.au-empty-state__title')).not.toBeNull();
  });

  it('projects actions into the actions container', () => {
    @Component({
      imports: [AuEmptyState, AuButton],
      template: `
        <au-empty-state title="Empty">
          <au-button type="button">Create item</au-button>
        </au-empty-state>
      `,
    })
    class ActionsHost {}

    const actionsFixture = TestBed.createComponent(ActionsHost);
    actionsFixture.detectChanges();
    expect(
      actionsFixture.nativeElement.querySelector('.au-empty-state__actions au-button'),
    ).not.toBeNull();
  });

  it('hides actions container when nothing is projected', () => {
    fixture.componentRef.setInput('title', 'Empty');
    fixture.detectChanges();
    const actions = host().querySelector('.au-empty-state__actions') as HTMLElement;
    expect(actions).not.toBeNull();
    expect(actions.children.length).toBe(0);
  });

  it('trims whitespace from title and description inputs', () => {
    fixture.componentRef.setInput('title', '  No users  ');
    fixture.componentRef.setInput('description', '  Try again  ');
    fixture.detectChanges();
    expect(host().querySelector('.au-empty-state__title')?.textContent).toBe('No users');
    expect(host().querySelector('.au-empty-state__description')?.textContent).toBe('Try again');
  });

  it('coerces nullish title and description to empty strings', () => {
    fixture.componentRef.setInput('title', null as unknown as string);
    fixture.componentRef.setInput('description', undefined as unknown as string);
    fixture.detectChanges();
    expect(host().querySelector('.au-empty-state__title')).toBeNull();
    expect(host().querySelector('.au-empty-state__description')).toBeNull();
  });
});
