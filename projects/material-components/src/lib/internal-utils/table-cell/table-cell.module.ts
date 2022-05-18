import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableCellComponent } from './table-cell.component';

@NgModule({
  declarations: [TableCellComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [TableCellComponent],
})
export class TableCellModule {}
