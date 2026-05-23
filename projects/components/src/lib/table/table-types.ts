export type AuTableSortDirection = 'asc' | 'desc' | null;

export type AuTableAlign = 'start' | 'end' | 'center';

export type AuTableCellVariant = 'default' | 'primary' | 'secondary';

export interface AuTableSortState {
  column: string;
  direction: AuTableSortDirection;
}
