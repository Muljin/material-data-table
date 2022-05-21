import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableColumn } from '@muljin/material-components/src/lib/types';

@Component({
  selector: 'muljin-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent {
  @Input() column!: TableColumn;
  @Input() row!: any;

  get cellValue() {
    return this.row[this.column.dataKey];
  }

  get templateValue() {
    if (this.cellValue != null) {
      if (this.column.valueFormatter) {
        return this.column.valueFormatter(this.cellValue);
      } else if (this.column.valueMerger) {
        return this.column.valueMerger(this.row);
      }
      return this.cellValue ?? '';
    }
  }

  get chipBackgroundColor() {
    return this.column.chip?.backgroundColorExtractor(this.cellValue);
  }

  get iconColor() {
    if (this.column.icon?.color) {
      return this.column.icon?.color(this.row);
    }
    return null;
  }

  get cellIcon() {
    if (this.column.icon) {
      if (typeof this.column.icon.src === 'function') {
        return this.column.icon.src(this.row);
      }
      return this.column.icon.src;
    }
    return null;
  }

  get iconTooltip() {
    if (this.column.icon?.tooltip) {
      if (typeof this.column.icon.tooltip === 'function') {
        return this.column.icon.tooltip(this.cellValue);
      }
      return this.column.icon.tooltip;
    }
    return '';
  }

  get imgSrc() {
    if (this.column.image) {
      if (typeof this.column.image.src === 'function') {
        return this.column.image.src(this.row);
      }
      return this.column.image.src;
    }
    return null;
  }
}
