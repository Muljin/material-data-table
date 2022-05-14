import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableAction } from '../../types/table-action';

@Component({
  selector: 'table-action',
  templateUrl: './table-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionComponent {
  @Input() action: TableAction | null = null;
  @Input() row: any = null;
}
