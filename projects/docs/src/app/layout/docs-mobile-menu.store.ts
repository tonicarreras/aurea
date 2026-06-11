import { Service, signal } from '@angular/core';

@Service()
export class DocsMobileMenuStore {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((value) => !value);
  }

  close(): void {
    this.open.set(false);
  }
}
