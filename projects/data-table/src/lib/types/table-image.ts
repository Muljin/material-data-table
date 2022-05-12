export type TableImage = {
  src: string | ((row: any) => string);
  width: number;
  height: number;
};
