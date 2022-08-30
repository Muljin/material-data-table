import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComponentsIntl {
  readonly changes: Subject<void> = new Subject<void>();

  /** A label for the filter dialog opening button for small screen sizes. */
  filtersLabel = 'Filter';

  /** A label for actions column. */
  actionsLabel = 'Actions';

  filtersDialogOk = 'OK';
  filtersDialogReset = 'Reset';

  tableNoDataToDisplay = 'There is no data to display.';
}
