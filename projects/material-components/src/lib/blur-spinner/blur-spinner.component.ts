import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'muljin-blur-spinner',
  template: ` <muljin-spinner></muljin-spinner> `,
  styleUrls: ['./blur-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurSpinnerComponent {
  @HostBinding('class') class = 'blurry-background';
}
