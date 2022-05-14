import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-background-blur',
  template: ` <spinner></spinner> `,
  styles: [
    `
      :host {
        pointer-events: all;
        z-index: 1;
        border: none;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        cursor: wait;
        position: absolute;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundBlurComponent {
  @HostBinding('class') class = 'blurry-background';
}
