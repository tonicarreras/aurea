import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuIcon, AU_ICON_NAMES } from './icon';

describe('AuIcon', () => {
  let fixture: ComponentFixture<AuIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(AuIcon);
    fixture.componentRef.setInput('name', 'info');
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is decorative', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.getAttribute('data-au-icon')).toBe('info');
  });

  it('renders each glyph', () => {
    for (const name of AU_ICON_NAMES) {
      fixture.componentRef.setInput('name', name);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.au-icon__svg')).not.toBeNull();
    }
  });

  it('reflects size on the host', () => {
    fixture.componentRef.setInput('name', 'info');
    for (const size of ['xs', 'sm', 'md', 'lg'] as const) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect((fixture.nativeElement as HTMLElement).getAttribute('data-au-size')).toBe(size);
    }
  });
});
