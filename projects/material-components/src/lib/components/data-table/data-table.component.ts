import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { TableAction } from '../../types/table-action';
import { TableColumn } from '../../types/table-column';

@Component({
  selector: 'muljin-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() data: Array<any> | null = null;
  @Input() loading: boolean | undefined | null = false;
  @Input() title: string | null = null;
  @Input() pagination = true;
  @Input() pageSizes = [5, 10, 20, 50, 100];
  @Input() pageSize: number | null = null;
  @Input() totalRecords: number | null = null;
  @Input() pageIndex: number | null = null;
  @Input() isClientSide = false;

  @Output() rowSelect = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() filterChange = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  filterColumns: TableColumn[] = [];
  filtersFormGroup: FormGroup | null = null;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._setFilterGroup();
  }

  ngAfterViewInit(): void {
    this._setTableConfiguration();
    // attaching the paginator only if the data is not paginated from the backend
    if (this.isClientSide) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this._setTableConfiguration(true);
      if (this.isClientSide) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  private _setTableConfiguration(refresh?: boolean): void {
    this.displayedColumns = this.columns.map((column) => column.dataKey);
    if (this.actions.length > 0) {
      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }
    // checking if the data is paginated from the backend or directly comes as array from the backend
    if (this.data) {
      this._setTableData(this.data, refresh);
    }
    this.dataSource.sort = this.sort;
  }

  private _setTableData(data: any[], refresh?: boolean): void {
    if (refresh) {
      this.dataSource.data = data;
    } else {
      this.dataSource = new MatTableDataSource(data);
    }
    if (!this.pageSize) {
      this.pageSize = this.pageSizes[0];
    }
    if (!this.pageIndex) {
      this.pageIndex = 0;
    }
    if (!this.totalRecords) {
      this.totalRecords = data.length;
    }
  }

  /*
   * This method checks what columns has specified the filter property.
   * and creates a form group with the same structure.
   */
  private _setFilterGroup(): void {
    //setup the filter formGroup
    const filters = this.columns.filter((c) => c.filter);
    const controls: { [key: string]: AbstractControl } = {};

    //create the controls for each filter
    for (const a of filters) {
      controls[a.filter?.controlName ?? a.dataKey] = new FormControl('');
    }

    if (Object.keys(controls).length > 0) {
      this.filtersFormGroup = this._fb.group(controls);
      this.filterColumns = filters;
    }
  }

  private _clientSideFilter(event: any): void {
    Object.keys(event).forEach((key) => {
      // first check if the filter is select type and has an enum to choose values from
      const selectFilter = this.columns.find(
        (c) => c.dataKey === key && c.filter?.type === 'select'
      );
      if (selectFilter) {
        this.dataSource.filterPredicate = (data, filter) =>
          data[key] === filter;
        this.dataSource.filter = event[key];
      } else {
        // otherwise treat it normally as a string
        this.dataSource.filterPredicate = (data, filter) =>
          data[key].trim().toLowerCase().indexOf(filter) !== -1;
        this.dataSource.filter = event[key].trim().toLowerCase();
      }
    });
    this.dataSource.paginator?.firstPage();
  }

  onRowSelect(row: any): void {
    this.rowSelect.emit(row);
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  onFilterChange(event: any): void {
    if (this.isClientSide) {
      this._clientSideFilter(event);
    } else {
      this.filterChange.emit(event);
    }
  }

  openFilterDialog(): void {
    const dialogRef = this._dialog.open(TableFilterComponent, {
      width: '350px',
    });
    const instance = dialogRef.componentInstance;
    instance.filterColumns = this.filterColumns;
    instance.filterFormGroup = this.filtersFormGroup!;
    instance.isDialog = true;
  }
}

@Component({
  selector: 'table-filter',
  templateUrl: '../table-filter/table-filter.component.html',
  styleUrls: ['../table-filter/table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent implements OnInit, OnDestroy {
  @Input() filterFormGroup!: FormGroup;
  @Input() filterColumns: TableColumn[] = [];
  @Input() isDialog = false;
  @Input() isClientSideFilter = false;

  @Output() filterChange = new EventEmitter();

  private readonly _sub = new Subscription();

  ngOnInit(): void {
    this._setupChangeStream(this.filterFormGroup);
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
