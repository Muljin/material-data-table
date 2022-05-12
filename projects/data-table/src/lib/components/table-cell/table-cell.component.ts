import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
