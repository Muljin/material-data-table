import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableActionComponent } from './components/table-action/table-action.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';

@NgModule({
  declarations: [
    DataTableComponent,
    TableCellComponent,
    TableActionComponent,
    TableFilterComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  exports: [
    DataTableComponent
  ],
})
export class DataTableModule {}
