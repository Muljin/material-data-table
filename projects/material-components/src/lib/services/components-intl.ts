import { Injectable, Optional, SkipSelf } from '@angular/core';
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

export function MULJIN_COMPONENT_INTL_PROVIDER_FACTORY(
  parentIntl: ComponentsIntl
) {
  return parentIntl || new ComponentsIntl();
}

export const MULJIN_COMPONENT_INTL_PROVIDER = {
  // If there is already an ComponentsIntl available, use that. Otherwise, provide a new one.
  provide: ComponentsIntl,
  deps: [[new Optional(), new SkipSelf(), ComponentsIntl]],
  useFactory: MULJIN_COMPONENT_INTL_PROVIDER_FACTORY,
};
