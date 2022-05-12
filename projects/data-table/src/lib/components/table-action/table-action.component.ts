import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-table-action',
  templateUrl: './table-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
