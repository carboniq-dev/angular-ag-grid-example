import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-form-field',
  imports: [MatError, MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() maxlength = '1000';
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() errors!: { [key: string]: string };

  hasError(errorCode: string): boolean {
    return this.control.hasError(errorCode);
  }
}
