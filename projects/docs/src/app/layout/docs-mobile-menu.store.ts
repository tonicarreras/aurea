import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocsMobileMenuStore {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }
}
