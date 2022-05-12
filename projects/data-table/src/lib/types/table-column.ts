import { TooltipPosition } from '@angular/material/tooltip';
import { TableImage } from './table-image';

export type TableColumn = {
  /*
   * The name to render in the column header.
   */
  label: string;
  /*
   * The key to use for lookup in the data object.
   */
  dataKey: string;
  image?: TableImage;
  valueFormatter?: (value: any) => string | null | number;
  valueMerger?: (row: any) => string | null | number; // to combine multiple values from data

  /*
   * wether the column is a link or not
   */
  link?: {
    onClick: (row: any) => void;
  };

  filter?: {
    type: 'text' | 'select' | 'date' | 'date-range';
    isClientSide?: boolean;
    /*
     * The filter input label.
     * #Optional: if not set, the label will be the dataKey
     */
    inputLabel?: string;
    /*
    Options for the select filter
     */
    options?: Array<{ value: any; label: string }>;
  };

  sort?: {
    isClientSide?: boolean;
  };

  /*
   * Wether the column should contain menus
   * it should be an array of objects
   */
  menu?: {
    // the key used to select items from the data objects inside the menu array
    dataKey: string;
    label?: string;
  };

  /*
   * Wether the column items should be displayed as chips
   */
  chip?: {
    backgroundColorExtractor: (row: any) => string;
  };

  icon?: {
    src: ((row: any) => string) | string;
    tooltip?: ((row: any) => string) | string;
    tooltipPosition?: TooltipPosition;
    color?: (row: any) => string;
    onClick?: (row: any) => void;
    isDisabled?: (row: any) => boolean;
  };
};
