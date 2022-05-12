import { ThemePalette } from '@angular/material/core';

export type AlfredTableAction = {
  label: string;
  color?: ThemePalette;
  icon?: string;
  hideLabel?: boolean;
  onClick: (row: any) => void;
  disableWhen?: (row: any) => boolean;
};
