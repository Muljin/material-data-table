import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackgroundBlurComponent } from './components/background-blur/background-blur.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableActionComponent } from './components/table-action/table-action.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    DataTableComponent,
    TableCellComponent,
    TableActionComponent,
    TableFilterComponent,
    BackgroundBlurComponent,
    SpinnerComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [DataTableComponent],
})
export class DataTableModule {}
