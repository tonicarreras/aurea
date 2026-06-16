import { APP_ID, Service, inject } from '@angular/core';

/** Pattern for auto-generated field control ids (`au-field-{appId}-{n}`). */
export const AU_FIELD_AUTO_ID_PATTERN = /^au-field-[\w-]+-\d+$/;

/**
 * Application-scoped unique ids for `au-form-field` and standalone field controls.
 *
 * Uses Angular's {@link APP_ID} so ids stay namespaced per bootstrap (SSR / micro-frontends).
 * Prefer explicit `controlIdInput` when tests or integrations need stable ids.
 */
@Service()
export class AuFieldIdGenerator {
  private readonly appId = inject(APP_ID);
  private nextSequence = 0;

  /** Returns the next auto id (`au-field-{appId}-…`) for label/control association. */
  nextFieldId(): string {
    return `au-field-${this.appId}-${++this.nextSequence}`;
  }
}

/** Allocates a field id from the root {@link AuFieldIdGenerator} (injection context required). */
export function injectAuFieldId(): string {
  return inject(AuFieldIdGenerator).nextFieldId();
}
