import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuIcon, type AuIconName } from './icon';

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
    const names: AuIconName[] = ['check-circle', 'warning', 'error', 'info', 'close', 'spinner'];
    for (const name of names) {
      fixture.componentRef.setInput('name', name);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.au-icon__svg')).not.toBeNull();
    }
  });
});
