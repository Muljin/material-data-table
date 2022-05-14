import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <mat-spinner [diameter]="diameter" color="accent"></mat-spinner>
  `,
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() diameter = '50';
}
