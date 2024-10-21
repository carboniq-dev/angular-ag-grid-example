import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialogActions,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Position, TableData } from '../../../types';
import { FormFieldComponent } from '../../form-field/form-field.component';

@Component({
  selector: 'edit-entry-modal',
  standalone: true,
  templateUrl: './edit-entry-modal.component.html',
  styleUrls: ['./edit-entry-modal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    FormFieldComponent,
  ],
  providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },],

})
export class EditEntryModalComponent {
  positions = Object.values(Position);

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    salary: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    position: new FormControl('', Validators.required),
    creationDate: new FormControl<Date | null>(null, Validators.required),
  });

  fullName = this.form.controls['fullName'];
  salary = this.form.controls['salary'];
  email = this.form.controls['email'];
  position = this.form.controls['position'];

  constructor(
    public dialogRef: MatDialogRef<EditEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableData
  ) {
    if (data) {
      this.form.patchValue({
        fullName: data.fullName,
        salary: data.salary,
        email: data.email,
        position: data.position,
        creationDate: data.creationDate
      });
    }
  }

  closeDialog() {
    if (this.form.valid) {
      const updatedData: TableData = {
        fullName: this.form.get('fullName')?.value || '',
        salary: Number(this.form.get('salary')?.value) || 0,
        email: this.form.get('email')?.value || '',
        position: this.form.get('position')?.value as Position || Position.NO_POSITION,
        creationDate: new Date(),
      };
      this.dialogRef.close(updatedData);
    }
  }
}
