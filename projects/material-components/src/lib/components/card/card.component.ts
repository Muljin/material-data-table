import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  template: `
    <div
      class="card card-background"
      [ngStyle]="{
        padding: padding,
        height: fullHeight ? '100%' : 'auto',
        overflowX: overFlowX,
        overflowY: overFlowY
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .card {
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 0.0625em 0.0625em,
          rgba(0, 0, 0, 0.15) 0px 0.125em 0.5em,
          rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        position: relative;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() padding = '0px';
  @Input() fullHeight = false;
  @Input() overFlowX: 'auto' | 'visible' = 'auto';
  @Input() overFlowY: 'auto' | 'visible' = 'auto';
}
