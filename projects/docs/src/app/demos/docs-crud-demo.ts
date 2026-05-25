import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  AuBreadcrumb,
  AuButton,
  AuDensityDirective,
  AuDialog,
  AuDialogFooter,
  AuFormField,
  AuInputText,
  AuMenu,
  AuMenuItem,
  AuMenuTrigger,
  AuPagination,
  AuSnackbar,
  AuSwitch,
  AuTable,
  AuTableCellDef,
  AuTableColumn,
  AuTheme,
  type AuBreadcrumbItem,
  type AuDensity,
  type AuTableSortState,
} from '@aurea-design-system/components';

import { DocsLocaleService } from '../core/docs-locale.service';
import {
  resolveDocsPreviewTheme,
  type DocsAppearanceTheme,
} from '../core/docs-theme-preview';

const PAGE_SIZE = 3;

interface PersonRow {
  id: string;
  name: string;
  role: string;
}

const SEED: PersonRow[] = [
  { id: '1', name: 'Ada Lovelace', role: 'Engineer' },
  { id: '2', name: 'Grace Hopper', role: 'Admiral' },
  { id: '3', name: 'Katherine Johnson', role: 'Mathematician' },
  { id: '4', name: 'Margaret Hamilton', role: 'Engineer' },
  { id: '5', name: 'Radia Perlman', role: 'Inventor' },
  { id: '6', name: 'Barbara Liskov', role: 'Researcher' },
  { id: '7', name: 'Shafi Goldwasser', role: 'Cryptographer' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'docs-crud-demo',
  imports: [
    AuBreadcrumb,
    AuButton,
    AuDensityDirective,
    AuDialog,
    AuDialogFooter,
    AuFormField,
    AuInputText,
    AuMenu,
    AuMenuItem,
    AuMenuTrigger,
    AuPagination,
    AuSnackbar,
    AuSwitch,
    AuTable,
    AuTableColumn,
    AuTableCellDef,
    AuTheme,
    FormField,
  ],
  template: `
    <div class="docs-crud-frame">
      <header class="docs-crud-frame__chrome">
        <div
          class="docs-crud-frame__dots"
          aria-hidden="true"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p class="docs-crud-frame__url">{{ t().frameTitle }}</p>
      </header>

      <div class="docs-crud-frame__settings">
        <div
          class="docs-crud-frame__group"
          role="group"
          [attr.aria-label]="t().themeLabel"
        >
          <au-button
              size="sm"
              type="button"
              [variant]="appearanceTheme() === 'light' ? 'primary' : 'ghost'"
              (click)="appearanceTheme.set('light')"
            >
              {{ t().themeLight }}
            </au-button>
            <au-button
              size="sm"
              type="button"
              [variant]="appearanceTheme() === 'dark' ? 'primary' : 'ghost'"
              (click)="appearanceTheme.set('dark')"
            >
              {{ t().themeDark }}
          </au-button>
        </div>

        <div class="docs-crud-frame__group docs-crud-frame__group--a11y">
          <au-switch
            size="sm"
            [label]="t().highContrastLabel"
            [checked]="highContrastEnabled()"
            (checkedChange)="highContrastEnabled.set($event)"
          />
        </div>

        <div
          class="docs-crud-frame__group"
          role="group"
          [attr.aria-label]="t().densityLabel"
        >
          <au-button
              size="sm"
              type="button"
              [variant]="previewDensity() === 'compact' ? 'primary' : 'ghost'"
              (click)="previewDensity.set('compact')"
            >
              {{ t().densityCompact }}
            </au-button>
            <au-button
              size="sm"
              type="button"
              [variant]="previewDensity() === 'comfortable' ? 'primary' : 'ghost'"
              (click)="previewDensity.set('comfortable')"
            >
              {{ t().densityComfortable }}
            </au-button>
            <au-button
              size="sm"
              type="button"
              [variant]="previewDensity() === 'spacious' ? 'primary' : 'ghost'"
              (click)="previewDensity.set('spacious')"
            >
              {{ t().densitySpacious }}
          </au-button>
        </div>
      </div>

      <div
        class="docs-crud-frame__viewport"
        [class.docs-crud-frame__viewport--dark]="
          resolvedTheme() === 'dark' || resolvedTheme() === 'high-contrast-dark'
        "
        [auTheme]="resolvedTheme()"
        [auDensity]="previewDensity()"
      >
        <div class="docs-crud-app">
          <header class="docs-crud-app__header">
            <au-breadcrumb [items]="crumbs" />
            <h2 class="docs-crud-app__title">{{ t().pageTitle }}</h2>
            <p class="docs-crud-app__subtitle">{{ t().pageSubtitle }}</p>
          </header>

          <div class="docs-crud-app__toolbar">
            <au-form-field [label]="t().filterLabel">
              <au-input-text
                type="search"
                [placeholder]="t().filterPlaceholder"
                [value]="filter()"
                (valueChange)="onFilterChange($event)"
              />
            </au-form-field>
            <au-button
              type="button"
              (click)="openCreate()"
              >{{ t().newPerson }}</au-button
            >
          </div>

          <section
            class="docs-crud-app__panel"
            aria-labelledby="docs-crud-table-title"
          >
            <h3
              id="docs-crud-table-title"
              class="docs-crud-app__sr-only"
            >
              {{ t().pageTitle }}
            </h3>
            <au-table
              [data]="pageRows()"
              [striped]="true"
              [caption]="t().pageTitle"
              [clientSort]="false"
              [(sort)]="tableSort"
              (sortChange)="page.set(1)"
              emptyMessage="—"
            >
              <au-table-column
                name="name"
                [header]="t().colName"
                [sortable]="true"
                cellVariant="primary"
              />
              <au-table-column
                name="role"
                [header]="t().colRole"
                cellVariant="secondary"
              />
              <au-table-column
                name="actions"
                [header]="t().colActions"
                align="center"
              >
                <ng-template
                  auTableCell
                  let-row
                >
                  <au-menu>
                    <au-button
                      auMenuTrigger
                      variant="ghost"
                      size="sm"
                      type="button"
                      [attr.aria-label]="t().colActions + ' — ' + row.name"
                      >⋯</au-button
                    >
                    <au-menu-item (select)="openEdit(row)">{{ t().edit }}</au-menu-item>
                    <au-menu-item (select)="openDelete(row)">{{ t().delete }}</au-menu-item>
                  </au-menu>
                </ng-template>
              </au-table-column>
            </au-table>

            <footer class="docs-crud-app__footer">
              <au-pagination
                [page]="page()"
                [pageCount]="pageCount()"
                (pageChange)="page.set($event)"
              />
            </footer>
          </section>
        </div>

        <au-dialog
          [(open)]="editOpen"
          [title]="t().editTitle"
          size="sm"
        >
          <au-form-field
            [label]="t().colName"
            [required]="true"
          >
            <au-input-text
              [formField]="editForm.name"
              autocomplete="name"
            />
          </au-form-field>
          <au-form-field
            [label]="t().colRole"
            [required]="true"
          >
            <au-input-text [formField]="editForm.role" />
          </au-form-field>
          <div auDialogFooter>
            <au-button
              variant="outline"
              type="button"
              (click)="editOpen.set(false)"
              >{{ t().cancel }}</au-button
            >
            <au-button
              type="button"
              (click)="saveEdit()"
              >{{ t().save }}</au-button
            >
          </div>
        </au-dialog>

        <au-dialog
          [(open)]="deleteOpen"
          [title]="t().deleteTitle"
          size="sm"
        >
          <p>{{ t().deleteBody }}</p>
          @if (deleteTarget(); as target) {
            <p>
              <strong>{{ target.name }}</strong> ({{ target.role }})
            </p>
          }
          <div auDialogFooter>
            <au-button
              variant="outline"
              type="button"
              (click)="deleteOpen.set(false)"
              >{{ t().cancel }}</au-button
            >
            <au-button
              variant="secondary"
              type="button"
              (click)="confirmDelete()"
              >{{ t().delete }}</au-button
            >
          </div>
        </au-dialog>

        <au-snackbar
          [(open)]="snackOpen"
          [message]="snackMessage()"
          variant="success"
          [durationMs]="3500"
          (dismiss)="snackOpen.set(false)"
        />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .docs-crud-frame {
      width: 100%;
      max-width: min(64rem, 100%);
      margin-inline: auto;
      border-radius: var(--au-radius-lg);
      border: 1px solid var(--docs-border-fine);
      box-shadow: var(--docs-elevated-shadow);
      overflow: hidden;
      background: var(--au-color-surface-sunken);
    }

    .docs-crud-frame__chrome {
      display: flex;
      align-items: center;
      gap: var(--au-space-3);
      padding: var(--au-space-2-5) var(--au-space-4);
      border-bottom: 1px solid var(--docs-border-fine);
      background: color-mix(in srgb, var(--au-color-surface-raised) 94%, transparent);
    }

    .docs-crud-frame__settings {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-2);
      padding: var(--au-space-2) var(--au-space-4);
      border-bottom: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-sunken);
    }

    .docs-crud-frame__dots {
      display: flex;
      gap: 0.35rem;
      flex-shrink: 0;
    }

    .docs-crud-frame__dots span {
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 50%;
      background: var(--au-color-border-default);
    }

    .docs-crud-frame__dots span:nth-child(1) {
      background: #ff5f57;
    }

    .docs-crud-frame__dots span:nth-child(2) {
      background: #febc2e;
    }

    .docs-crud-frame__dots span:nth-child(3) {
      background: #28c840;
    }

    .docs-crud-frame__url {
      margin: 0;
      flex: 1;
      min-width: 0;
      padding: var(--au-space-1) var(--au-space-3);
      border-radius: var(--au-radius-sm);
      border: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-canvas);
      font-family: var(--au-font-mono);
      font-size: var(--au-text-xs);
      color: var(--au-color-text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .docs-crud-frame__group {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1px;
      padding: 2px;
      border-radius: var(--au-radius-sm);
      border: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-raised);
    }

    .docs-crud-frame__group--a11y {
      padding: var(--au-space-1) var(--au-space-2-5);
    }

    :host ::ng-deep .docs-crud-frame__group--a11y .au-switch__field {
      flex-direction: row;
      align-items: center;
      gap: var(--au-space-2);
    }

    :host ::ng-deep .docs-crud-frame__group--a11y .au-switch__label {
      margin: 0;
      font-size: var(--au-text-xs);
      white-space: nowrap;
    }

    :host ::ng-deep .docs-crud-frame__group--a11y .au-switch__label-host {
      order: 2;
    }

    :host ::ng-deep .docs-crud-frame__group--a11y .au-switch__control-row {
      order: 1;
    }

    .docs-crud-frame__viewport {
      min-height: 28rem;
      padding: clamp(var(--au-space-4), 3vw, var(--au-space-8));
      background: var(--au-color-surface-canvas);
      transition:
        background-color var(--au-duration-slow) var(--au-ease-in-out),
        color var(--au-duration-slow) var(--au-ease-in-out);
    }

    .docs-crud-frame__viewport--dark {
      box-shadow: inset 0 1px 0 color-mix(in srgb, var(--au-color-text-on-solid) 4%, transparent);
    }

    .docs-crud-app {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-5);
      width: 100%;
    }

    .docs-crud-app__header {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-2);
      padding-bottom: var(--au-space-4);
      border-bottom: 1px solid var(--au-color-border-subtle);
    }

    .docs-crud-app__title {
      margin: 0;
      font-size: var(--au-text-xl);
      font-weight: var(--au-weight-semibold);
      letter-spacing: -0.02em;
      color: var(--au-color-text-primary);
    }

    .docs-crud-app__subtitle {
      margin: 0;
      max-width: 42rem;
      font-size: var(--au-text-sm);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-secondary);
    }

    .docs-crud-app__toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: var(--au-space-4);
      justify-content: space-between;
    }

    .docs-crud-app__toolbar au-form-field {
      flex: 1 1 14rem;
      min-width: 12rem;
      max-width: 20rem;
    }

    .docs-crud-app__panel {
      position: relative;
      border-radius: var(--au-radius-md);
      background: var(--au-color-surface-raised);
      box-shadow: var(--au-shadow-control);
      overflow: hidden;
    }

    .docs-crud-app__panel :where(au-table) {
      display: block;
    }

    .docs-crud-app__footer {
      display: flex;
      justify-content: flex-end;
      padding: var(--au-space-3) var(--au-space-4);
      border-top: 1px solid var(--au-color-border-subtle);
      background: color-mix(in srgb, var(--au-color-surface-canvas) 40%, transparent);
    }

    .docs-crud-app__sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
})
export class DocsCrudDemo {
  private readonly i18n = inject(DocsLocaleService);

  readonly t = computed(() => this.i18n.messages().ecosystem.crudDemo);

  readonly appearanceTheme = signal<DocsAppearanceTheme>('light');
  readonly highContrastEnabled = signal(false);
  readonly previewDensity = signal<AuDensity>('comfortable');

  readonly resolvedTheme = computed(() =>
    resolveDocsPreviewTheme(this.appearanceTheme(), this.highContrastEnabled()),
  );

  readonly crumbs: AuBreadcrumbItem[] = [{ label: 'Team', href: '#' }, { label: 'People' }];

  readonly rows = signal<PersonRow[]>([...SEED]);
  readonly filter = signal('');
  readonly page = signal(1);
  readonly tableSort = signal<AuTableSortState | null>(null);

  readonly editOpen = signal(false);
  readonly deleteOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly deleteTarget = signal<PersonRow | null>(null);

  readonly snackOpen = signal(false);
  readonly snackMessage = signal('');

  readonly editModel = signal({ name: '', role: '' });
  readonly editForm = form(this.editModel, (m) => {
    required(m.name, { message: 'Required' });
    required(m.role, { message: 'Required' });
  });

  readonly filteredRows = computed(() => {
    const q = this.filter().trim().toLowerCase();
    let list = this.rows();
    if (q) {
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }
    const sort = this.tableSort();
    if (sort?.column === 'name' && sort.direction) {
      list = [...list].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return sort.direction === 'asc' ? cmp : -cmp;
      });
    }
    return list;
  });

  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.filteredRows().length / PAGE_SIZE)),
  );

  readonly pageRows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filteredRows().slice(start, start + PAGE_SIZE);
  });

  protected onFilterChange(value: string | null): void {
    this.filter.set(value ?? '');
    this.page.set(1);
  }

  protected openCreate(): void {
    this.editingId.set(null);
    this.editModel.set({ name: '', role: '' });
    this.editOpen.set(true);
  }

  protected openEdit(row: PersonRow): void {
    this.editingId.set(row.id);
    this.editModel.set({ name: row.name, role: row.role });
    this.editOpen.set(true);
  }

  protected openDelete(row: PersonRow): void {
    this.deleteTarget.set(row);
    this.deleteOpen.set(true);
  }

  protected saveEdit(): void {
    this.editForm().markAsTouched();
    if (!this.editForm().valid()) {
      return;
    }
    const { name, role } = this.editModel();
    const id = this.editingId();
    if (id) {
      this.rows.update((list) => list.map((r) => (r.id === id ? { ...r, name, role } : r)));
    } else {
      this.rows.update((list) => [...list, { id: crypto.randomUUID(), name, role }]);
    }
    this.editOpen.set(false);
    this.showSnack(this.t().snackbarSaved);
  }

  protected confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) {
      return;
    }
    this.rows.update((list) => list.filter((r) => r.id !== target.id));
    this.deleteOpen.set(false);
    this.deleteTarget.set(null);
    this.page.set(Math.min(this.page(), this.pageCount()));
    this.showSnack(this.t().snackbarDeleted);
  }

  private showSnack(message: string): void {
    this.snackMessage.set(message);
    this.snackOpen.set(true);
  }
}
