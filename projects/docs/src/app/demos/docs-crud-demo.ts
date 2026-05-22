import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  AuBreadcrumb,
  AuButton,
  AuDialog,
  AuDialogFooter,
  AuFormField,
  AuInputText,
  AuMenu,
  AuMenuItem,
  AuMenuTrigger,
  AuPagination,
  AuSnackbar,
  AuTable,
  AuTableSortHeader,
  type AuBreadcrumbItem,
} from '@aurea-design-system/components';

import { DocsLocaleService } from '../core/docs-locale.service';

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
    AuDialog,
    AuDialogFooter,
    AuFormField,
    AuInputText,
    AuMenu,
    AuMenuItem,
    AuMenuTrigger,
    AuPagination,
    AuSnackbar,
    AuTable,
    AuTableSortHeader,
    FormField,
  ],
  template: `
    <div class="docs-crud-demo">
      <au-breadcrumb [items]="crumbs" />

      <div class="docs-crud-demo__toolbar">
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

      <au-table [striped]="true">
        <thead>
          <tr>
            <th
              auTableSortHeader
              [sortDirection]="nameSort()"
              (sort)="nameSort.set($event); page.set(1)"
            >
              {{ t().colName }}
            </th>
            <th scope="col">{{ t().colRole }}</th>
            <th
              scope="col"
              class="docs-crud-demo__actions-col"
            >
              {{ t().colActions }}
            </th>
          </tr>
        </thead>
        <tbody>
          @for (row of pageRows(); track row.id) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.role }}</td>
              <td class="docs-crud-demo__actions-col">
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
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="3">—</td>
            </tr>
          }
        </tbody>
      </au-table>

      <au-pagination
        [page]="page()"
        [pageCount]="pageCount()"
        (pageChange)="page.set($event)"
      />

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
            variant="primary"
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
  `,
  styles: `
    .docs-crud-demo {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-5);
      max-width: min(56rem, 100%);
    }

    .docs-crud-demo__toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: var(--au-space-4);
      justify-content: space-between;
    }

    .docs-crud-demo__toolbar au-form-field {
      flex: 1 1 14rem;
      min-width: 12rem;
    }

    .docs-crud-demo__actions-col {
      width: 5rem;
      text-align: right;
    }
  `,
})
export class DocsCrudDemo {
  private readonly i18n = inject(DocsLocaleService);

  readonly t = computed(() => this.i18n.messages().ecosystem.crudDemo);

  readonly crumbs: AuBreadcrumbItem[] = [{ label: 'Team', href: '#' }, { label: 'People' }];

  readonly rows = signal<PersonRow[]>([...SEED]);
  readonly filter = signal('');
  readonly page = signal(1);
  readonly nameSort = signal<'asc' | 'desc' | null>(null);

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
    const sort = this.nameSort();
    if (sort) {
      list = [...list].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        return sort === 'asc' ? cmp : -cmp;
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
