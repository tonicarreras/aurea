import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuTable } from '@aurea-design-system/components';

@Component({
  selector: 'docs-preview-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuTable],
  template: `
    <au-table
      [striped]="true"
      [compact]="true"
    >
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ada</td>
          <td>Engineer</td>
        </tr>
        <tr>
          <td>Grace</td>
          <td>Admiral</td>
        </tr>
      </tbody>
    </au-table>
  `,
})
export class TableDemo {}
