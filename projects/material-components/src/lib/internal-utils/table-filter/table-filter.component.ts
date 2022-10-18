import { NgClass, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  ComponentsIntl,
  MULJIN_COMPONENT_INTL_PROVIDER,
} from '@muljin/material-components/src/lib/services';
import { TableColumn } from '@muljin/material-components/src/lib/types';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'muljin-table-filter',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgForOf,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [MULJIN_COMPONENT_INTL_PROVIDER],
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

  constructor(
    public _intl: ComponentsIntl,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this._sub.add(
      _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck())
    );
  }

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
