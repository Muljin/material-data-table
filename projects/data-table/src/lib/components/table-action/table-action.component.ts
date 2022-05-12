import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'table-action',
  templateUrl: './table-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
