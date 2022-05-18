import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableAction } from '@muljin/material-components/src/lib/types';

@Component({
  selector: 'muljin-table-action',
  templateUrl: './table-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionComponent {
  @Input() action: TableAction | null = null;
  @Input() row: any = null;
}
