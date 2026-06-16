import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuBreadcrumb, type AuBreadcrumbItem } from './breadcrumb';

describe('AuBreadcrumb', () => {
  let fixture: ComponentFixture<AuBreadcrumb>;

  const items: AuBreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Button' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuBreadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(AuBreadcrumb);
    fixture.componentRef.setInput('items', items);
    await fixture.whenStable();
  });

  it('creates with navigation semantics', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('navigation');
    expect(host.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('marks the last item as current page', () => {
    const current = fixture.nativeElement.querySelector('[aria-current="page"]');
    expect(current?.textContent).toContain('Button');
  });

  it('renders links for non-terminal items', () => {
    const links = fixture.nativeElement.querySelectorAll('.au-breadcrumb__link');
    expect(links.length).toBe(2);
    expect((links[0] as HTMLAnchorElement).getAttribute('href')).toBe('/');
  });
});
