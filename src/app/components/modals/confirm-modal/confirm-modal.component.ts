import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'confirm-modal',
  standalone: true,
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  imports: [
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatDialogActions
  ],
})
export class ConfirmModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
