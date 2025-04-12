import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {
  private formBuilder = inject(FormBuilder);
  public formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    gender: [null, Validators.required],
    wantNotifications: [true],
    termAndCondition: [false, Validators.requiredTrue],
  });

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
