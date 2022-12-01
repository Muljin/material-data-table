import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgForOf, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { BlurSpinnerComponent } from '@muljin/material-components/src/lib/blur-spinner';
import { TableActionComponent } from '@muljin/material-components/src/lib/internal-utils/table-action';
import { TableCellComponent } from '@muljin/material-components/src/lib/internal-utils/table-cell';
import { TableFilterComponent } from '@muljin/material-components/src/lib/internal-utils/table-filter';
import {
  ComponentsIntl,
  MULJIN_COMPONENT_INTL_PROVIDER,
} from '@muljin/material-components/src/lib/services';
import {
  TableAction,
  TableColumn,
} from '@muljin/material-components/src/lib/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'muljin-data-table',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgForOf,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    TableActionComponent,
    TableFilterComponent,
    TableCellComponent,
    MatSortModule,
    BlurSpinnerComponent,
    MatButtonModule,
    MatDialogModule,
    DragDropModule,
    MatCardModule,
    NgTemplateOutlet,
  ],
  providers: [MULJIN_COMPONENT_INTL_PROVIDER],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @ViewChild(MatTable) table!: MatTable<any>;

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
  @Input() initialFilterValues: any = null;
  @Input() dragAndDrop = false;

  @Output() rowSelect = new EventEmitter<any>();
  @Output() dropRow = new EventEmitter<{ event: CdkDragDrop<any>; row: any }>();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() filterChange = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  filterColumns: TableColumn[] = [];
  filtersFormGroup: FormGroup | null = null;

  private _intlChanges: Subscription;

  // whether the client side filter is shown right now, so if new data comes in, we can react to it so we don't reset the filter
  isFilteredData = false;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _dialog: MatDialog,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    public _intl: ComponentsIntl
  ) {
    this._intlChanges = _intl.changes.subscribe(() =>
      this._changeDetectorRef.markForCheck()
    );
  }

  ngOnInit(): void {
    this._setFilterGroup();
  }

  ngAfterViewInit(): void {
    this._setTableConfiguration();
    // attaching the paginator only if the data is not paginated from the backend
    if (this.isClientSide) {
      this.dataSource.paginator = this.paginator;
    }

    if (!this.pagination) {
      this.pageSize = this.dataSource.data.length;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this._setTableConfiguration();
      if (this.isClientSide) {
        this.dataSource.paginator = this.paginator;
      }
    }

    if (changes['pageIndex'] && this.pageIndex) {
      this.pageIndex--;
    }
  }

  private _setTableConfiguration(): void {
    this.displayedColumns = this.columns.map((column) => column.dataKey);
    if (this.actions.length > 0) {
      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }

    if (this.data && !this.isFilteredData) {
      this._setTableData(this.data);
      this._changeDetectorRef.markForCheck();
    }
    this.dataSource.sort = this.sort;
  }

  private _setTableData(data: any[]): void {
    this.dataSource = new MatTableDataSource(data);
    if (!this.pageSize) {
      this.pageSize = this.isClientSide
        ? this.pageSizes[0]
        : this.dataSource.data.length;
    }

    if (!this.pagination) {
      this.pageSize = this.dataSource.data.length;
    }

    // if the data array is empty and it's not the first page then emit a page event with the first page
    if (data.length === 0 && this.pageIndex !== 0) {
      this.pageChange.emit({
        length: this.totalRecords ?? this.pageSize,
        pageIndex: 1,
        pageSize: this.pageSize,
      });
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

  // dropTable will just rearrange the rows while onDropRow will emit the event
  dropTable(event: CdkDragDrop<any[]>): void {
    const prev = this.dataSource.data;
    moveItemInArray(prev, event.previousIndex, event.currentIndex);
    this.dataSource.data = prev;
    this.table.renderRows();
  }

  onRowSelect(row: any): void {
    this.rowSelect.emit(row);
  }

  onDropRow(event: CdkDragDrop<any>, row: any) {
    this.dropRow.emit({ event, row });
  }

  onPageChange(event: PageEvent): void {
    // start from 1 instead of 0
    event.pageIndex++;
    this.pageChange.emit(event);
  }

  onFilterChange(event: any): void {
    if (this.isClientSide) {
      this._clientSideFilter(event);
      this.isFilteredData = Object.values(event).length ? true : false;
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

  ngOnDestroy() {
    this._intlChanges.unsubscribe();
  }
}
