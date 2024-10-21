import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AgGridModule } from 'ag-grid-angular';
import { TableData } from '../../types';
import { FetchService } from '../../services/fetch.service';
import { CreateEntryModalComponent } from '../modals/create-entry-modal/create-entry-modal.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
} from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { EditEntryModalComponent } from '../modals/edit-entry-modal/edit-entry-modal.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'doc-table',
  standalone: true,
  imports: [
    ButtonComponent,
    AgGridModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly paginationPageSizeSelector = [10, 20, 50, 100]
  readonly paginationPageSize = 10
  rowData: TableData[] = [];
  columnDefs: ColDef[] = [
    { field: 'fullName', headerName: 'Full Name', sortable: true, filter: true },
    { field: 'salary', headerName: 'Salary', sortable: true, filter: true },
    { field: 'position', headerName: 'Position', sortable: true, filter: true },
    { field: 'creationDate', headerName: 'Creation Date', sortable: true, filter: true },
    {
      headerName: 'Edit',
      cellRenderer: ButtonComponent,
      cellRendererParams: {
        icon: 'edit',
        onClick: (data: TableData) => this.onEdit(data),
      },
      width: 150
    },
    {
      headerName: 'Delete',
      cellRenderer: ButtonComponent,
      cellRendererParams: {
        icon: 'delete',
        onClick: (data: TableData) => this.onDelete(data),
      },
      width: 150
    }
  ];

  constructor(
    public dialog: MatDialog,
    private fetchService: FetchService,
    private changeDetector: ChangeDetectorRef) { }

  onEdit(data: TableData): void {
    this.openEditModal(data)
  }

  onDelete(data: TableData): void {
    const confirmDialogRef = this.dialog.open(ConfirmModalComponent);

    confirmDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.rowData = this.rowData.filter(row => row !== data);
        this.changeDetector.detectChanges();
      }
    });
  }

  openCreateModal(): void {
    const modalRef = this.dialog.open(CreateEntryModalComponent);

    modalRef.afterClosed().subscribe((result: TableData | undefined) => {
      if (result) {
        this.rowData = [...this.rowData, result];

        this.changeDetector.detectChanges();
      }
    });
  }

  openEditModal(data: TableData) {
    const dialogRef = this.dialog.open(EditEntryModalComponent, {
      data
    });

    dialogRef.afterClosed().subscribe((updatedData: TableData | undefined) => {
      if (updatedData) {
        this.rowData = this.rowData.map(row =>
          row.fullName === data.fullName ? updatedData : row
        );
        this.changeDetector.detectChanges();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.rowData = await this.fetchService.fetchTableData()
    this.changeDetector.detectChanges();
  }
}
