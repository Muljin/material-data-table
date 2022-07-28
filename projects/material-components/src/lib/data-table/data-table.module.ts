import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
    MatButtonModule,
    MatDialogModule,
    DragDropModule,
  ],
  exports: [DataTableComponent],
})
export class DataTableModule {}
