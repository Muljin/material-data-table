import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'muljin-card',
  standalone: true,
  imports: [NgStyle],
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
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() padding = '0px';
  @Input() fullHeight = false;
  @Input() overFlowX: 'auto' | 'visible' = 'auto';
  @Input() overFlowY: 'auto' | 'visible' = 'auto';
}
