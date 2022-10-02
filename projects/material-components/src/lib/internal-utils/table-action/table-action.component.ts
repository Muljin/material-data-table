import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableAction } from '@muljin/material-components/src/lib/types';

@Component({
  selector: 'muljin-table-action',
  standalone: true,
  imports: [NgIf, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './table-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionComponent {
  @Input() action: TableAction | null = null;
  @Input() row: any = null;
}
