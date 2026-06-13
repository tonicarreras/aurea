import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  AuAccordion,
  AuAccordionItem,
  AuAccordionPanel,
  AuAutocomplete,
  AuAvatar,
  AuBadge,
  AuBreadcrumb,
  AuButton,
  AuButtonGroup,
  AuCard,
  AuCheckbox,
  AuChip,
  AuChipGroup,
  AuDensityDirective,
  AuDescriptionItem,
  AuDescriptionList,
  AuDialog,
  AuDialogFooter,
  AuDrawer,
  AuEmptyState,
  AuFormField,
  AuIcon,
  AuInputDate,
  AuInputText,
  AuLink,
  AuMenu,
  AuMenuItem,
  AuMenuTrigger,
  AuMessage,
  AuPagination,
  AuPopover,
  AuPopoverTrigger,
  AuProgress,
  AuSelect,
  AuSlider,
  AuSnackbar,
  AuSwitch,
  AuTab,
  AuTabPanel,
  AuTable,
  AuTableCellDef,
  AuTableColumn,
  AuTabs,
  AuTagInput,
  AuTextarea,
  AuTheme,
  AuTooltip,
  type AuAutocompleteOption,
  type AuBreadcrumbItem,
  type AuDensity,
  type AuSelectOption,
  type AuTableSortState,
} from '@aurea-design-system/components';

import { DocsLocaleService } from '../core/docs-locale.service';
import { resolveDocsPreviewTheme, type DocsAppearanceTheme } from '../core/docs-theme-preview';
import {
  CRUD_PAGE_SIZE,
  CRUD_SEED,
  PERSON_ROLES,
  type PersonRow,
  type PersonStatus,
} from './docs-crud-demo.data';

type StatusFilter = 'all' | PersonStatus;

type CrudEditModel = {
  name: string;
  email: string;
  role: string | null;
  status: PersonStatus | null;
  joined: string | null;
  skills: string[];
  notes: string;
  progress: number;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'docs-crud-demo',
  imports: [
    AuAccordion,
    AuAccordionItem,
    AuAccordionPanel,
    AuAutocomplete,
    AuAvatar,
    AuBadge,
    AuBreadcrumb,
    AuButton,
    AuButtonGroup,
    AuCard,
    AuCheckbox,
    AuChip,
    AuChipGroup,
    AuDensityDirective,
    AuDescriptionItem,
    AuDescriptionList,
    AuDialog,
    AuDialogFooter,
    AuDrawer,
    AuEmptyState,
    AuFormField,
    AuIcon,
    AuInputDate,
    AuInputText,
    AuLink,
    AuMenu,
    AuMenuItem,
    AuMenuTrigger,
    AuMessage,
    AuPagination,
    AuPopover,
    AuPopoverTrigger,
    AuProgress,
    AuSelect,
    AuSlider,
    AuSnackbar,
    AuSwitch,
    AuTab,
    AuTabPanel,
    AuTable,
    AuTableColumn,
    AuTableCellDef,
    AuTabs,
    AuTagInput,
    AuTextarea,
    AuTheme,
    AuTooltip,
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
        <div class="docs-crud-frame__settings-row">
          <div
            class="docs-crud-frame__group"
            role="group"
            [attr.aria-label]="t().themeLabel"
          >
            <button auButton
              size="sm"
              type="button"
              [variant]="appearanceTheme() === 'light' ? 'primary' : 'ghost'"
              (click)="appearanceTheme.set('light')"
            >
              {{ t().themeLight }}
            </button>
            <button auButton
              size="sm"
              type="button"
              [variant]="appearanceTheme() === 'dark' ? 'primary' : 'ghost'"
              (click)="appearanceTheme.set('dark')"
            >
              {{ t().themeDark }}
            </button>
          </div>

          <div
            class="docs-crud-frame__group docs-crud-frame__group--a11y"
            role="group"
            [attr.aria-label]="t().highContrastLabel"
          >
            <button type="button" auSwitch
              size="sm"
              [checked]="highContrastEnabled()"
              (checkedChange)="highContrastEnabled.set($event)"
              aria-labelledby="docs-crud-a11y-label"><span class="au-sr-only">{{ t().highContrastLabel }}</span></button>
            <span
              class="docs-crud-frame__inline-label"
              id="docs-crud-a11y-label"
            >
              {{ t().highContrastLabel }}
            </span>
          </div>

          <div
            class="docs-crud-frame__group"
            role="group"
            [attr.aria-label]="t().densityLabel"
          >
            <button auButton
              size="sm"
              type="button"
              [variant]="previewDensity() === 'compact' ? 'primary' : 'ghost'"
              (click)="previewDensity.set('compact')"
            >
              {{ t().densityCompact }}
            </button>
            <button auButton
              size="sm"
              type="button"
              [variant]="previewDensity() === 'comfortable' ? 'primary' : 'ghost'"
              (click)="previewDensity.set('comfortable')"
            >
              {{ t().densityComfortable }}
            </button>
            <button auButton
              size="sm"
              type="button"
              [variant]="previewDensity() === 'spacious' ? 'primary' : 'ghost'"
              (click)="previewDensity.set('spacious')"
            >
              {{ t().densitySpacious }}
            </button>
          </div>
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

          <au-tabs
            class="docs-crud-app__tabs"
            [(value)]="mainTab"
            [ariaLabel]="t().pageTitle"
          >
            <button
              type="button"
              auTab="list"
            >
              {{ t().tabList }}
            </button>
            <button
              type="button"
              auTab="insights"
            >
              {{ t().tabInsights }}
            </button>

            <div
              auTabPanel="list"
              class="docs-crud-app__tab-panel"
            >
              <section
                class="docs-crud-app__filters"
                [attr.aria-label]="t().filterLabel"
              >
                <div class="docs-crud-app__toolbar">
                  <div class="docs-crud-app__toolbar-fields">
                    <au-form-field
                      [label]="t().filterLabel"
                      [hint]="t().filterHint"
                    >
                      <input auInputText
                        type="search"
                        [placeholder]="t().filterPlaceholder"
                        [value]="filter()"
                        (valueChange)="onFilterChange($event)"
                      />
                    </au-form-field>
                    <au-form-field
                      [label]="t().roleFilterLabel"
                      [hint]="t().roleFilterHint"
                    >
                      <au-select
                        [options]="roleFilterOptions()"
                        [value]="roleFilter() || null"
                        (valueChange)="onRoleFilterChange($event)"
                      />
                    </au-form-field>
                    <au-form-field
                      [label]="t().personPickLabel"
                      [hint]="t().personPickHint"
                    >
                      <au-autocomplete
                        [placeholder]="t().personPickPlaceholder"
                        [options]="personPickOptions()"
                        [value]="personPick()"
                        (valueChange)="onPersonPick($event)"
                      />
                    </au-form-field>
                  </div>
                  <div class="docs-crud-app__toolbar-actions">
                    <au-button-group
                      [ariaLabel]="t().colActions"
                      [attached]="true"
                    >
                      <button auButton
                        type="button"
                        class="docs-crud-app__btn-add"
                        [auTooltip]="t().newPerson"
                        auTooltipPlacement="bottom"
                        (click)="openCreate()"
                      >
                        <au-icon
                          name="plus"
                          size="sm"
                          aria-hidden="true"
                        />
                        {{ t().newPerson }}
                      </button>
                      <au-popover placement="bottom">
                        <button auButton
                          auPopoverTrigger
                          variant="outline"
                          type="button"
                          >{{ t().exportMenu }}</button
                        >
                        <div class="docs-crud-app__export-popover">
                          <button auButton
                            variant="ghost"
                            size="sm"
                            type="button"
                            (click)="exportData('csv')"
                            >{{ t().exportCsv }}</button
                          >
                          <button auButton
                            variant="ghost"
                            size="sm"
                            type="button"
                            (click)="exportData('json')"
                            >{{ t().exportJson }}</button
                          >
                        </div>
                      </au-popover>
                    </au-button-group>
                  </div>
                </div>

                @if (hasActiveFilters()) {
                  <div
                    class="docs-crud-app__active-filters"
                    role="status"
                  >
                    @if (filter(); as query) {
                      <au-chip
                        [label]="query"
                        [removable]="true"
                        (removed)="onFilterChange('')"
                      />
                    }
                    @if (roleFilter(); as role) {
                      <au-chip
                        [label]="role"
                        [removable]="true"
                        (removed)="onRoleFilterChange(null)"
                      />
                    }
                    @if (statusFilter() !== 'all') {
                      <au-chip
                        [label]="statusFilter() === 'active' ? t().statusActive : t().statusAway"
                        [removable]="true"
                        (removed)="setStatusFilter('all')"
                      />
                    }
                  </div>
                }

                <div class="docs-crud-app__status-row">
                  <span class="docs-crud-app__filter-label">{{ t().statusFilterLabel }}</span>
                  <au-chip-group [ariaLabel]="t().statusFilterLabel">
                    <au-chip
                      size="sm"
                      [label]="t().statusAll"
                      [selectable]="true"
                      [selected]="statusFilter() === 'all'"
                      (selectedChange)="onStatusChip('all', $event)"
                    />
                    <au-chip
                      size="sm"
                      [label]="t().statusActive"
                      [selectable]="true"
                      [selected]="statusFilter() === 'active'"
                      (selectedChange)="onStatusChip('active', $event)"
                    />
                    <au-chip
                      size="sm"
                      [label]="t().statusAway"
                      [selectable]="true"
                      [selected]="statusFilter() === 'away'"
                      (selectedChange)="onStatusChip('away', $event)"
                    />
                  </au-chip-group>
                </div>

                <au-accordion
                  class="docs-crud-app__filters-advanced"
                  [(value)]="accordionExpanded"
                  [multiple]="false"
                  [ariaLabel]="t().advancedFilters"
                >
                  <div class="au-accordion__item">
                    <button
                      type="button"
                      auAccordionItem="filters"
                    >
                      {{ t().advancedFilters }}
                    </button>
                    <au-accordion-panel panel="filters">
                      <div class="docs-crud-app__advanced">
                        <au-form-field
                          [label]="t().minProgressLabel"
                          [hint]="t().minProgressHint"
                        >
                          <au-slider
                            [value]="minProgress()"
                            [min]="0"
                            [max]="100"
                            [step]="5"
                            (valueChange)="onMinProgressChange($event)"
                          />
                        </au-form-field>
                        <div class="docs-crud-app__advanced-toggle">
                          <input type="checkbox" auCheckbox
                            [label]="t().remoteOnlyLabel"
                            [checked]="awayOnly()"
                            (checkedChange)="onAwayOnlyChange($event)"
                          />
                        </div>
                      </div>
                    </au-accordion-panel>
                  </div>
                </au-accordion>
              </section>

              @if (tableSelection().length > 0) {
                <au-message variant="info">
                  <div class="docs-crud-app__selection-bar">
                    <span>{{ selectedCountMessage() }}</span>
                    <button auButton
                      size="sm"
                      variant="outline"
                      type="button"
                      (click)="clearSelection()"
                      >{{ t().clearSelection }}</button
                    >
                    <button auButton
                      size="sm"
                      variant="secondary"
                      type="button"
                      (click)="bulkDelete()"
                      >{{ t().bulkDelete }}</button
                    >
                  </div>
                </au-message>
              }

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
                @if (filteredRows().length === 0) {
                  <au-empty-state
                    icon="search"
                    size="sm"
                    [headingLevel]="3"
                    [title]="t().emptyTitle"
                    [description]="t().emptyDescription"
                  >
                    <button auButton
                      variant="outline"
                      type="button"
                      (click)="resetFilters()"
                      >{{ t().emptyReset }}</button
                    >
                  </au-empty-state>
                } @else {
                  <au-table
                    [data]="pageRows()"
                    [striped]="true"
                    [caption]="t().pageTitle"
                    [clientSort]="false"
                    [loading]="tableLoading()"
                    selectionMode="multiple"
                    [(selection)]="tableSelection"
                    [compareSelection]="comparePersonRow"
                    [(sort)]="tableSort"
                    (sortChange)="page.set(1)"
                    emptyMessage="—"
                  >
                    <au-table-column
                      name="name"
                      [header]="t().colName"
                      [sortable]="true"
                      cellVariant="primary"
                    >
                      <ng-template
                        auTableCell
                        let-row
                      >
                        <div class="docs-crud-app__person-cell">
                          <au-avatar
                            [name]="row.name"
                            size="sm"
                            [decorative]="true"
                          />
                          <div class="docs-crud-app__person-meta">
                            <a
                              auLink
                              href="#"
                              (click)="openDrawer(row, $event)"
                              >{{ row.name }}</a
                            >
                            <span class="docs-crud-app__email-hint">{{ row.email }}</span>
                          </div>
                        </div>
                      </ng-template>
                    </au-table-column>
                    <au-table-column
                      name="role"
                      [header]="t().colRole"
                    >
                      <ng-template
                        auTableCell
                        let-row
                      >
                        <au-badge
                          variant="accent"
                          [label]="row.role"
                        />
                      </ng-template>
                    </au-table-column>
                    <au-table-column
                      name="status"
                      [header]="t().colStatus"
                    >
                      <ng-template
                        auTableCell
                        let-row
                      >
                        <au-badge
                          [variant]="row.status === 'active' ? 'success' : 'warning'"
                          [label]="row.status === 'active' ? t().statusActive : t().statusAway"
                        />
                      </ng-template>
                    </au-table-column>
                    <au-table-column
                      name="joined"
                      [header]="t().colJoined"
                    />
                    <au-table-column
                      name="progress"
                      [header]="t().colProgress"
                    >
                      <ng-template
                        auTableCell
                        let-row
                      >
                        <div class="docs-crud-app__progress-cell">
                          <au-progress
                            [value]="row.progress"
                            [label]="row.name + ' — ' + t().colProgress + ' ' + row.progress + '%'"
                          />
                          <span
                            class="docs-crud-app__progress-value"
                            aria-hidden="true"
                            >{{ row.progress }}%</span
                          >
                        </div>
                      </ng-template>
                    </au-table-column>
                    <au-table-column
                      name="actions"
                      [header]="t().colActions"
                      align="center"
                    >
                      <ng-template
                        auTableCell
                        let-row
                      >
                        <div class="docs-crud-app__row-actions">
                          <button auButton
                            size="sm"
                            variant="ghost"
                            type="button"
                            [auTooltip]="t().viewProfile"
                            (click)="openDrawer(row)"
                            >{{ t().viewProfile }}</button
                          >
                          <au-menu>
                            <button auButton
                              auMenuTrigger
                              variant="ghost"
                              size="sm"
                              type="button"
                              [attr.aria-label]="t().colActions + ' — ' + row.name"
                              >⋯</button
                            >
                            <au-menu-item (select)="openEdit(row)">{{ t().edit }}</au-menu-item>
                            <au-menu-item (select)="openDelete(row)">{{ t().delete }}</au-menu-item>
                          </au-menu>
                        </div>
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
                }
              </section>
            </div>

            <div
              auTabPanel="insights"
              class="docs-crud-app__tab-panel"
            >
              <p class="docs-crud-app__insights-lead">{{ t().insightsLead }}</p>
              <div class="docs-crud-app__stats">
                <au-card
                  variant="outlined"
                  size="sm"
                >
                  <p
                    auCardHeader
                    class="docs-crud-app__stat-label"
                  >
                    {{ t().statsTotal }}
                  </p>
                  <p class="docs-crud-app__stat-value">{{ workspaceStats().total }}</p>
                </au-card>
                <au-card
                  variant="outlined"
                  size="sm"
                >
                  <p
                    auCardHeader
                    class="docs-crud-app__stat-label"
                  >
                    {{ t().statsActive }}
                  </p>
                  <p class="docs-crud-app__stat-value">{{ workspaceStats().active }}</p>
                </au-card>
                <au-card
                  variant="outlined"
                  size="sm"
                >
                  <p
                    auCardHeader
                    class="docs-crud-app__stat-label"
                  >
                    {{ t().statsAway }}
                  </p>
                  <p class="docs-crud-app__stat-value">{{ workspaceStats().away }}</p>
                </au-card>
                <au-card
                  variant="outlined"
                  size="sm"
                >
                  <p
                    auCardHeader
                    class="docs-crud-app__stat-label"
                  >
                    {{ t().statsAvgProgress }}
                  </p>
                  <p class="docs-crud-app__stat-value">{{ workspaceStats().avgProgress }}%</p>
                </au-card>
              </div>
              <section
                class="docs-crud-app__insights-detail"
                [attr.aria-label]="t().tabInsights"
              >
                <au-description-list
                  layout="horizontal"
                  [columns]="2"
                >
                  <au-description-item [term]="t().statsTotal">{{
                    workspaceStats().total
                  }}</au-description-item>
                  <au-description-item [term]="t().statsActive">{{
                    workspaceStats().active
                  }}</au-description-item>
                  <au-description-item [term]="t().statsAway">{{
                    workspaceStats().away
                  }}</au-description-item>
                  <au-description-item [term]="t().statsAvgProgress"
                    >{{ workspaceStats().avgProgress }}%</au-description-item
                  >
                </au-description-list>
              </section>
            </div>
          </au-tabs>

          <p class="docs-crud-app__legend">{{ t().componentLegend }}</p>
        </div>

        <au-drawer
          [(open)]="drawerOpen"
          [title]="t().drawerTitle"
          position="end"
          size="md"
        >
          @if (detailRow(); as person) {
            <div class="docs-crud-app__drawer">
              <div class="docs-crud-app__drawer-head">
                <au-avatar
                  [name]="person.name"
                  size="lg"
                />
                <div>
                  <h3 class="docs-crud-app__drawer-name">{{ person.name }}</h3>
                  <p class="docs-crud-app__drawer-role">{{ person.role }}</p>
                </div>
              </div>
              <au-progress
                [value]="person.progress"
                [label]="t().colProgress"
              />
              <au-description-list layout="vertical">
                <au-description-item [term]="t().fieldEmail">{{
                  person.email
                }}</au-description-item>
                <au-description-item [term]="t().fieldJoined">{{
                  person.joined
                }}</au-description-item>
                <au-description-item [term]="t().colStatus">
                  {{ person.status === 'active' ? t().statusActive : t().statusAway }}
                </au-description-item>
                <au-description-item [term]="t().fieldSkills">{{
                  person.skills.join(', ')
                }}</au-description-item>
                <au-description-item [term]="t().fieldNotes">{{
                  person.notes
                }}</au-description-item>
              </au-description-list>
            </div>
          }
          <div auDrawerFooter>
            <button auButton
              variant="outline"
              type="button"
              (click)="drawerOpen.set(false)"
              >{{ t().drawerClose }}</button
            >
            @if (detailRow(); as person) {
              <button auButton
                type="button"
                (click)="openEditFromDrawer(person)"
                >{{ t().edit }}</button
              >
            }
          </div>
        </au-drawer>

        <au-dialog
          [(open)]="editOpen"
          [title]="editingId() ? t().editTitle : t().createTitle"
          size="md"
        >
          <div class="docs-crud-app__dialog-form">
            <au-form-field
              [label]="t().colName"
              [hint]="t().fieldNameHint"
              [required]="true"
            >
              <input auInputText
                [formField]="editForm.name"
                autocomplete="name"
              />
            </au-form-field>
            <au-form-field
              [label]="t().fieldEmail"
              [hint]="t().fieldEmailHint"
              [required]="true"
            >
              <input auInputText
                [formField]="editForm.email"
                type="email"
                autocomplete="email"
              />
            </au-form-field>
            <au-form-field
              [label]="t().colRole"
              [hint]="t().fieldRoleHint"
              [required]="true"
            >
              <au-select
                [formField]="editForm.role"
                [options]="roleEditOptions()"
              />
            </au-form-field>
            <au-form-field
              [label]="t().colStatus"
              [hint]="t().fieldStatusHint"
              [required]="true"
            >
              <au-select
                [formField]="editForm.status"
                [options]="statusEditOptions()"
              />
            </au-form-field>
            <au-form-field
              [label]="t().fieldJoined"
              [hint]="t().fieldJoinedHint"
            >
              <input auInputDate [formField]="editForm.joined" />
            </au-form-field>
            <au-form-field
              [label]="t().fieldSkills"
              [hint]="t().fieldSkillsHint"
            >
              <au-tag-input
                [formField]="editForm.skills"
                [placeholder]="t().skillsPlaceholder"
              />
            </au-form-field>
            <au-form-field
              [label]="t().colProgress"
              [hint]="t().fieldProgressHint"
            >
              <au-slider [formField]="editForm.progress" />
            </au-form-field>
            <au-form-field
              [label]="t().fieldNotes"
              [hint]="t().fieldNotesHint"
            >
              <textarea auTextarea
                [formField]="editForm.notes"
                [rows]="3"></textarea>
            </au-form-field>
          </div>
          <div auDialogFooter>
            <button auButton
              variant="outline"
              type="button"
              (click)="editOpen.set(false)"
              >{{ t().cancel }}</button
            >
            <button auButton
              type="button"
              (click)="saveEdit()"
              >{{ t().save }}</button
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
            <button auButton
              variant="outline"
              type="button"
              (click)="deleteOpen.set(false)"
              >{{ t().cancel }}</button
            >
            <button auButton
              variant="secondary"
              type="button"
              (click)="confirmDelete()"
              >{{ t().delete }}</button
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
      max-width: min(72rem, 100%);
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
      justify-content: flex-start;
      width: 100%;
      padding: var(--au-space-2-5) var(--au-space-4);
      border-bottom: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-sunken);
    }

    .docs-crud-frame__settings-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-3);
    }

    .docs-crud-frame__inline-label {
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-medium);
      line-height: var(--au-leading-tight);
      color: var(--au-color-text-secondary);
      white-space: nowrap;
      user-select: none;
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
      display: inline-flex;
      flex: 0 0 auto;
      flex-wrap: nowrap;
      align-items: center;
      gap: 1px;
      box-sizing: border-box;
      min-height: calc(var(--au-button-height-sm, 2rem) + 4px);
      padding: 2px;
      border-radius: var(--au-radius-sm);
      border: 1px solid var(--docs-border-fine);
      background: var(--au-color-surface-raised);
    }

    .docs-crud-frame__group--a11y {
      gap: var(--au-space-2);
      padding: 2px var(--au-space-2-5);
    }

    .docs-crud-frame__viewport {
      min-height: 32rem;
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

    .docs-crud-app__tabs {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
    }

    .docs-crud-app__tab-panel {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
      padding-top: var(--au-space-3);
    }

    .docs-crud-app__filters {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
      padding: var(--au-space-4);
      border-radius: var(--au-radius-md);
      border: 1px solid var(--au-color-border-subtle);
      background: var(--au-color-surface-elevated);
    }

    .docs-crud-app__toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      gap: var(--au-space-3) var(--au-space-4);
    }

    .docs-crud-app__toolbar-fields {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
      align-items: end;
      gap: var(--au-space-3) var(--au-space-4);
      flex: 1 1 22rem;
      min-width: 0;
    }

    .docs-crud-app__toolbar-actions {
      display: flex;
      flex-shrink: 0;
      align-items: flex-end;
    }

    .docs-crud-app__export-popover {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--au-space-1);
      min-width: 8.5rem;
      padding: var(--au-space-2);
    }

    .docs-crud-app__active-filters {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-2);
      padding-top: var(--au-space-3);
      border-top: 1px dashed var(--au-color-border-subtle);
    }

    .docs-crud-app__status-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-2) var(--au-space-3);
    }

    .docs-crud-app__filters-advanced {
      margin-top: calc(-1 * var(--au-space-1));
    }

    .docs-crud-app__filters-advanced .au-accordion__item:first-child {
      border-block-start: none;
    }

    .docs-crud-app__filters-advanced .au-accordion__item {
      border-block-end: none;
    }

    .docs-crud-app__filters-advanced button.au-accordion__trigger {
      box-sizing: border-box;
      width: calc(100% - 2 * var(--au-space-2));
      margin-inline: var(--au-space-2);
      padding-inline: var(--au-space-3);
      border-radius: var(--au-radius-sm);
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
    }

    .docs-crud-app__filter-label {
      flex-shrink: 0;
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-semibold);
      letter-spacing: var(--au-tracking-caps);
      text-transform: uppercase;
      color: var(--au-color-text-secondary);
      line-height: 1.75rem;
    }

    .docs-crud-app__status-row au-chip-group {
      flex: 1 1 auto;
      min-width: 0;
    }

    .docs-crud-app__advanced {
      display: grid;
      grid-template-columns: minmax(12rem, 1fr) auto;
      align-items: center;
      gap: var(--au-space-4) var(--au-space-6);
      padding: var(--au-space-1) 0 var(--au-space-2);
    }

    .docs-crud-app__advanced-toggle {
      display: flex;
      align-items: center;
      min-height: 2.75rem;
      padding-block: var(--au-space-2);
    }

    @media (max-width: 36rem) {
      .docs-crud-app__advanced {
        grid-template-columns: 1fr;
      }

      .docs-crud-app__advanced-toggle {
        min-height: 0;
      }
    }

    .docs-crud-app__selection-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--au-space-3);
    }

    .docs-crud-app__panel {
      position: relative;
      min-width: 0;
    }

    .docs-crud-app__panel :where(au-table) {
      display: block;
    }

    .docs-crud-app__panel:has(au-empty-state) {
      min-height: 16rem;
    }

    .docs-crud-app__progress-cell {
      display: flex;
      align-items: center;
      gap: var(--au-space-2);
      width: 100%;
      min-width: 6.5rem;
      max-width: 10rem;
    }

    .docs-crud-app__progress-cell au-progress {
      flex: 1 1 auto;
      min-width: 0;
    }

    .docs-crud-app__progress-value {
      flex-shrink: 0;
      font-size: var(--au-text-xs);
      font-variant-numeric: tabular-nums;
      color: var(--au-color-text-secondary);
    }

    .docs-crud-app__footer {
      display: flex;
      justify-content: flex-end;
      padding: var(--au-space-3) var(--au-space-4);
      background: color-mix(in srgb, var(--au-color-surface-canvas) 40%, transparent);
    }

    .docs-crud-app__person-cell {
      display: flex;
      align-items: center;
      gap: var(--au-space-3);
      min-width: 0;
    }

    .docs-crud-app__person-meta {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      min-width: 0;
    }

    .docs-crud-app__email-hint {
      font-size: var(--au-text-xs);
      color: var(--au-color-text-tertiary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .docs-crud-app__row-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: var(--au-space-1);
    }

    .docs-crud-app__insights-lead {
      margin: 0;
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
    }

    .docs-crud-app__stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      gap: var(--au-space-3);
    }

    .docs-crud-app__stats au-card {
      height: 100%;
    }

    .docs-crud-app__stat-label {
      margin: 0;
      font-size: var(--au-text-xs);
      font-weight: var(--au-weight-medium);
      color: var(--au-color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .docs-crud-app__stat-value {
      margin: var(--au-space-2) 0 0;
      padding: 0 var(--au-space-4) var(--au-space-4);
      font-size: var(--au-text-2xl);
      font-weight: var(--au-weight-semibold);
      line-height: 1.1;
      color: var(--au-color-text-primary);
    }

    .docs-crud-app__insights-detail {
      padding: var(--au-space-4);
      border-radius: var(--au-radius-md);
      border: 1px solid var(--au-color-border-subtle);
      background: var(--au-color-surface-raised);
    }

    .docs-crud-app__drawer {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-5);
    }

    .docs-crud-app__drawer-head {
      display: flex;
      align-items: center;
      gap: var(--au-space-4);
    }

    .docs-crud-app__drawer-name {
      margin: 0;
      font-size: var(--au-text-lg);
      font-weight: var(--au-weight-semibold);
    }

    .docs-crud-app__drawer-role {
      margin: var(--au-space-1) 0 0;
      font-size: var(--au-text-sm);
      color: var(--au-color-text-secondary);
    }

    .docs-crud-app__legend {
      margin: 0;
      padding-top: var(--au-space-2);
      font-size: var(--au-text-xs);
      line-height: var(--au-leading-relaxed);
      color: var(--au-color-text-tertiary);
      border-top: 1px dashed var(--au-color-border-subtle);
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

    .docs-crud-app__dialog-form {
      display: flex;
      flex-direction: column;
      gap: var(--au-space-4);
    }

    .docs-crud-app__dialog-form + * {
      margin-top: 0;
    }
  `,
})
export class DocsCrudDemo {
  private readonly i18n = inject(DocsLocaleService);
  private loadingTimer: ReturnType<typeof setTimeout> | undefined;

  readonly t = computed(() => this.i18n.messages().ecosystem.crudDemo);

  readonly appearanceTheme = signal<DocsAppearanceTheme>('light');
  readonly highContrastEnabled = signal(false);
  readonly previewDensity = signal<AuDensity>('comfortable');

  readonly resolvedTheme = computed(() =>
    resolveDocsPreviewTheme(this.appearanceTheme(), this.highContrastEnabled()),
  );

  readonly crumbs: AuBreadcrumbItem[] = [{ label: 'Team', href: '#' }, { label: 'People' }];

  readonly mainTab = signal('list');
  readonly accordionExpanded = signal<string[]>([]);

  readonly rows = signal<PersonRow[]>([...CRUD_SEED]);
  readonly filter = signal('');
  readonly roleFilter = signal('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly awayOnly = signal(false);
  readonly minProgress = signal(0);
  readonly personPick = signal<string | null>(null);
  readonly page = signal(1);
  readonly tableSort = signal<AuTableSortState | null>(null);
  readonly tableLoading = signal(false);
  readonly tableSelection = signal<readonly PersonRow[]>([]);

  readonly drawerOpen = signal(false);
  readonly detailRow = signal<PersonRow | null>(null);

  readonly editOpen = signal(false);
  readonly deleteOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly deleteTarget = signal<PersonRow | null>(null);

  readonly snackOpen = signal(false);
  readonly snackMessage = signal('');

  readonly editModel = signal<CrudEditModel>({
    name: '',
    email: '',
    role: null,
    status: 'active',
    joined: null,
    skills: [],
    notes: '',
    progress: 50,
  });
  readonly editForm = form(this.editModel, (m) => {
    const requiredMsg = this.i18n.messages().ecosystem.crudDemo.fieldRequired;
    required(m.name, { message: requiredMsg });
    required(m.email, { message: requiredMsg });
    required(m.role, { message: requiredMsg });
    required(m.status, { message: requiredMsg });
  });

  readonly roleFilterOptions = computed((): AuSelectOption[] => [
    { value: '', label: this.t().roleFilterAll },
    ...PERSON_ROLES.map((role) => ({ value: role, label: role })),
  ]);

  readonly roleEditOptions = computed((): AuSelectOption[] =>
    PERSON_ROLES.map((role) => ({ value: role, label: role })),
  );

  readonly statusEditOptions = computed((): AuSelectOption[] => [
    { value: 'active', label: this.t().statusActive },
    { value: 'away', label: this.t().statusAway },
  ]);

  readonly personPickOptions = computed((): AuAutocompleteOption[] =>
    this.rows().map((row) => ({ value: row.id, label: row.name })),
  );

  readonly selectedCountMessage = computed(() =>
    this.t().selectedCount.replace('{{count}}', String(this.tableSelection().length)),
  );

  readonly hasActiveFilters = computed(
    () =>
      Boolean(this.filter().trim()) ||
      Boolean(this.roleFilter()) ||
      this.statusFilter() !== 'all' ||
      this.awayOnly() ||
      this.minProgress() > 0,
  );

  readonly workspaceStats = computed(() => {
    const list = this.rows();
    const active = list.filter((r) => r.status === 'active').length;
    const away = list.filter((r) => r.status === 'away').length;
    const avgProgress = list.length
      ? Math.round(list.reduce((sum, row) => sum + row.progress, 0) / list.length)
      : 0;
    return { total: list.length, active, away, avgProgress };
  });

  readonly filteredRows = computed(() => {
    const q = this.filter().trim().toLowerCase();
    const role = this.roleFilter();
    const status = this.statusFilter();
    const min = this.minProgress();
    let list = this.rows();
    if (q) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.skills.some((skill) => skill.toLowerCase().includes(q)),
      );
    }
    if (role) {
      list = list.filter((r) => r.role === role);
    }
    if (status !== 'all') {
      list = list.filter((r) => r.status === status);
    }
    if (this.awayOnly()) {
      list = list.filter((r) => r.status === 'away');
    }
    if (min > 0) {
      list = list.filter((r) => r.progress >= min);
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
    Math.max(1, Math.ceil(this.filteredRows().length / CRUD_PAGE_SIZE)),
  );

  readonly pageRows = computed(() => {
    const start = (this.page() - 1) * CRUD_PAGE_SIZE;
    return this.filteredRows().slice(start, start + CRUD_PAGE_SIZE);
  });

  protected readonly comparePersonRow = (a: unknown, b: unknown): boolean =>
    (a as PersonRow).id === (b as PersonRow).id;

  protected onFilterChange(value: string | null): void {
    this.triggerTableLoading();
    this.filter.set(value ?? '');
    this.page.set(1);
  }

  protected onRoleFilterChange(value: string | null): void {
    this.triggerTableLoading();
    this.roleFilter.set(value ?? '');
    this.page.set(1);
  }

  protected onStatusChip(filter: StatusFilter, selected: boolean): void {
    if (selected) {
      this.setStatusFilter(filter);
      return;
    }
    if (this.statusFilter() === filter && filter !== 'all') {
      this.setStatusFilter('all');
    }
  }

  protected setStatusFilter(filter: StatusFilter): void {
    this.triggerTableLoading();
    this.statusFilter.set(filter);
    this.page.set(1);
  }

  protected onMinProgressChange(value: number): void {
    this.triggerTableLoading();
    this.minProgress.set(value);
    this.page.set(1);
  }

  protected onAwayOnlyChange(checked: boolean): void {
    this.triggerTableLoading();
    this.awayOnly.set(checked);
    this.page.set(1);
  }

  protected onPersonPick(value: string | null): void {
    this.personPick.set(value);
    if (!value) {
      return;
    }
    const row = this.rows().find((r) => r.id === value);
    if (row) {
      this.openDrawer(row);
      this.personPick.set(null);
    }
  }

  protected resetFilters(): void {
    this.filter.set('');
    this.roleFilter.set('');
    this.statusFilter.set('all');
    this.awayOnly.set(false);
    this.minProgress.set(0);
    this.personPick.set(null);
    this.page.set(1);
    this.triggerTableLoading();
  }

  protected clearSelection(): void {
    this.tableSelection.set([]);
  }

  protected openCreate(): void {
    this.editingId.set(null);
    this.editModel.set({
      name: '',
      email: '',
      role: null,
      status: 'active',
      joined: new Date().toISOString().slice(0, 10),
      skills: [],
      notes: '',
      progress: 50,
    });
    this.editOpen.set(true);
  }

  protected openEdit(row: PersonRow): void {
    this.editingId.set(row.id);
    this.editModel.set({
      name: row.name,
      email: row.email,
      role: row.role,
      status: row.status,
      joined: row.joined,
      skills: [...row.skills],
      notes: row.notes,
      progress: row.progress,
    });
    this.editOpen.set(true);
  }

  protected openEditFromDrawer(row: PersonRow): void {
    this.drawerOpen.set(false);
    this.openEdit(row);
  }

  protected openDrawer(row: PersonRow, event?: Event): void {
    event?.preventDefault();
    this.detailRow.set(row);
    this.drawerOpen.set(true);
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
    const { name, email, role, status, joined, skills, notes, progress } = this.editModel();
    if (!role || !status || !email.trim()) {
      return;
    }
    const payload: Omit<PersonRow, 'id'> = {
      name: name.trim(),
      email: email.trim(),
      role,
      status,
      joined: joined ?? new Date().toISOString().slice(0, 10),
      skills: [...skills],
      notes: notes.trim(),
      progress,
    };
    const id = this.editingId();
    if (id) {
      this.rows.update((list) => list.map((r) => (r.id === id ? { ...r, ...payload } : r)));
      this.detailRow.update((current) =>
        current?.id === id ? { ...current, ...payload, id } : current,
      );
    } else {
      this.rows.update((list) => [...list, { id: crypto.randomUUID(), ...payload }]);
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
    this.tableSelection.update((selected) => selected.filter((r) => r.id !== target.id));
    this.detailRow.update((current) => (current?.id === target.id ? null : current));
    if (this.detailRow() === null) {
      this.drawerOpen.set(false);
    }
    this.deleteOpen.set(false);
    this.deleteTarget.set(null);
    this.page.set(Math.min(this.page(), this.pageCount()));
    this.showSnack(this.t().snackbarDeleted);
  }

  protected bulkDelete(): void {
    const ids = new Set(this.tableSelection().map((row) => row.id));
    if (ids.size === 0) {
      return;
    }
    this.rows.update((list) => list.filter((r) => !ids.has(r.id)));
    this.tableSelection.set([]);
    if (this.detailRow() && ids.has(this.detailRow()!.id)) {
      this.detailRow.set(null);
      this.drawerOpen.set(false);
    }
    this.page.set(Math.min(this.page(), this.pageCount()));
    this.showSnack(this.t().snackbarBulkDeleted);
  }

  protected exportData(format: 'csv' | 'json'): void {
    const data = this.filteredRows();
    const blob =
      format === 'csv'
        ? new Blob(
            [
              ['name', 'email', 'role', 'status', 'joined', 'progress'].join(',') +
                '\n' +
                data
                  .map((r) =>
                    [r.name, r.email, r.role, r.status, r.joined, String(r.progress)]
                      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
                      .join(','),
                  )
                  .join('\n'),
            ],
            { type: 'text/csv' },
          )
        : new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `people.${format}`;
    anchor.click();
    URL.revokeObjectURL(url);
    this.showSnack(this.t().snackbarExported);
  }

  private triggerTableLoading(): void {
    this.tableLoading.set(true);
    clearTimeout(this.loadingTimer);
    this.loadingTimer = setTimeout(() => this.tableLoading.set(false), 350);
  }

  private showSnack(message: string): void {
    this.snackMessage.set(message);
    this.snackOpen.set(true);
  }
}
