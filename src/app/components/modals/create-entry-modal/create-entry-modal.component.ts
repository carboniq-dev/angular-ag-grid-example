import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Position, TableData } from '../../../types';
import { FormFieldComponent } from '../../form-field/form-field.component';

@Component({
  selector: 'create-entry-modal',
  standalone: true,
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
  templateUrl: './create-entry-modal.component.html',
  styleUrls: ['./create-entry-modal.component.scss'],
})
export class CreateEntryModalComponent {
  positions = Object.values(Position);

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    salary: new FormControl<number | null>(0, [Validators.required, Validators.min(0)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    position: new FormControl('', Validators.required),
  });

  fullName = this.form.controls['fullName'];
  salary = this.form.controls['salary'];
  email = this.form.controls['email'];
  position = this.form.controls['position'];

  constructor(public modalRef: MatDialogRef<CreateEntryModalComponent>) { }

  closeModal() {
    if (this.form.valid) {
      const tableData: TableData = {
        fullName: this.form.get('fullName')?.value || '',
        salary: Number(this.form.get('salary')?.value) || 0,
        email: this.form.get('email')?.value || '',
        position: this.form.get('position')?.value as Position || Position.NO_POSITION,
        creationDate: new Date(),
      };
      this.modalRef.close(tableData);
    }
  }
}