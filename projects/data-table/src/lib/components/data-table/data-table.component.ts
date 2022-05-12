import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'muljin-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
