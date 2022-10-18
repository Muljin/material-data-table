import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { SpinnerComponent } from '@muljin/material-components/src/lib/spinner';

@Component({
  selector: 'muljin-blur-spinner',
  standalone: true,
  imports: [SpinnerComponent],
  template: ` <muljin-spinner></muljin-spinner> `,
  styleUrls: ['./blur-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurSpinnerComponent {
  @HostBinding('class') class = 'blurry-background';
}
