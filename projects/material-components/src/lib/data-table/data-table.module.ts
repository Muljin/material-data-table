import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BlurSpinnerModule } from '@muljin/material-components/src/lib/blur-spinner';
import { CardModule } from '@muljin/material-components/src/lib/card';
import { TableActionModule } from '@muljin/material-components/src/lib/internal-utils/table-action';
import { TableCellModule } from '@muljin/material-components/src/lib/internal-utils/table-cell';
import { TableFilterModule } from '@muljin/material-components/src/lib/internal-utils/table-filter';
import { DataTableComponent } from './data-table.component';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    TableActionModule,
    TableFilterModule,
    TableCellModule,
    MatSortModule,
    CardModule,
    BlurSpinnerModule,
  ],
  exports: [DataTableComponent],
})
export class DataTableModule {}
