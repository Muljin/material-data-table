import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerModule } from '@muljin/material-components/src/lib/spinner';
import { BlurSpinnerComponent } from './blur-spinner.component';

@NgModule({
  declarations: [BlurSpinnerComponent],
  imports: [CommonModule, SpinnerModule],
  exports: [BlurSpinnerComponent],
})
export class BlurSpinnerModule {}
