import { ColDef } from 'ag-grid-community';

export enum Position {
  NO_POSITION = "None",
  SOFTWARE_DEVELOPER = "Software Developer/Engineer",
  PRODUCT_MANAGER = "Product Manager",
  UIUX_DESIGNER = "UI/UX Designer",
  QUALITY_INSURANCE = "Quality Assurance",
  DEVOPS = "DevOps ",
}

export interface TableData {
  fullName: string;
  salary: number;
  email: string;
  position: Position;
  creationDate: Date;
}

export interface TableColumnMeta extends ColDef {
  field: keyof TableData;
  headerName: string;
  sortable?: boolean;
  filter?: boolean;
}
