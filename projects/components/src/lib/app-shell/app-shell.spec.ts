import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuAppShell } from './app-shell';
import { AuAppShellFooter, AuAppShellHeader, AuAppShellBanner } from './app-shell-slots.directive';

@Component({
  imports: [AuAppShell, AuAppShellHeader, AuAppShellFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <au-app-shell>
      <header auAppShellHeader>Header</header>
      <p>Main</p>
      <footer auAppShellFooter>Footer</footer>
    </au-app-shell>
  `,
})
class AppShellHost {}

describe('AuAppShell', () => {
  let fixture: ComponentFixture<AppShellHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppShellHost] }).compileComponents();
    fixture = TestBed.createComponent(AppShellHost);
    await fixture.whenStable();
  });

  it('projects header, main, and footer regions', () => {
    const shell = fixture.nativeElement.querySelector('au-app-shell');
    expect(shell.querySelector('.au-app-shell__main')?.textContent).toContain('Main');
    expect(shell.querySelector('.au-app-shell__header-slot')).toBeTruthy();
    expect(shell.querySelector('.au-app-shell__footer-slot')).toBeTruthy();
  });

  it('registers slot directives', () => {
    const shell = fixture.debugElement.query(By.directive(AuAppShell))
      .componentInstance as AuAppShell;
    expect(shell.headerSlot()).toBeDefined();
    expect(shell.footerSlot()).toBeDefined();
  });

  it('projects optional banner region', async () => {
    @Component({
      imports: [AuAppShell, AuAppShellHeader, AuAppShellBanner, AuAppShellFooter],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <au-app-shell>
          <header auAppShellHeader>Header</header>
          <div auAppShellBanner>Banner</div>
          <p>Main</p>
          <footer auAppShellFooter>Footer</footer>
        </au-app-shell>
      `,
    })
    class BannerHost {}

    const bannerFixture = TestBed.createComponent(BannerHost);
    await bannerFixture.whenStable();

    const shellEl = bannerFixture.nativeElement.querySelector('au-app-shell');
    expect(shellEl.querySelector('.au-app-shell__banner-slot')?.textContent).toContain('Banner');

    const shell = bannerFixture.debugElement.query(By.directive(AuAppShell))
      .componentInstance as AuAppShell;
    expect(shell.bannerSlot()).toBeDefined();
  });
});
