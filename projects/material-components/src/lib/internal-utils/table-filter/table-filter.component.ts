import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TableColumn } from '@muljin/material-components/src/lib/types';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'muljin-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent implements OnInit, OnDestroy {
  @Input() filterFormGroup!: FormGroup;
  @Input() filterColumns: TableColumn[] = [];
  @Input() isDialog = false;
  @Input() isClientSideFilter = false;
  @Input() initialFilterValues: any = null;

  @Output() filterChange = new EventEmitter();

  private readonly _sub = new Subscription();

  ngOnInit(): void {
    this._setupChangeStream(this.filterFormGroup);
    for (const key in this.initialFilterValues) {
      if (this.filterFormGroup.value.hasOwnProperty(key)) {
        this.filterFormGroup.controls[key].setValue(
          this.initialFilterValues[key],
          {
            emitEvent: false,
          }
        );
        this.filterFormGroup.controls[key].markAsDirty();
      }
    }
  }

  private _setupChangeStream(formGroup: FormGroup): void {
    this._sub.add(
      formGroup.valueChanges
        .pipe(
          debounceTime(this.isClientSideFilter ? 0 : 200),
          distinctUntilChanged(
            (a, b) => JSON.stringify(a) === JSON.stringify(b)
          )
        )
        .subscribe((value) => this.filterChange.emit(value))
    );
  }

  resetFilters(): void {
    this.filterFormGroup.reset();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
