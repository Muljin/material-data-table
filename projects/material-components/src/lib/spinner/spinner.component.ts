import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'muljin-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <mat-spinner [diameter]="diameter" color="accent"></mat-spinner>
  `,
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() diameter = '50';
}
