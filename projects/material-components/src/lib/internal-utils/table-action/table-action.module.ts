import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableActionComponent } from './table-action.component';

@NgModule({
  declarations: [TableActionComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  exports: [TableActionComponent],
})
export class TableActionModule {}
