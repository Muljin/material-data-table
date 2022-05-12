import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
