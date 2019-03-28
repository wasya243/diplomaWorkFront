import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ValidationService } from '../../core/validation.service';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: [ './form-validation.component.scss' ]
})
export class FormValidationComponent implements OnInit, OnChanges {

  @Input() offset: number;
  @Input() validationElement: FormControl | FormGroup | FormArray;
  isGroup: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.isGroup = this.validationElement instanceof FormGroup;
  }

  getError(): string {
    const messageKey = this.getErrorName();

    return ValidationService.getValidationErrorMessage(messageKey, this.validationElement.errors[ messageKey ]);
  }


  getErrorName(): string {

    if (!this.validationElement.errors) {
      return;
    }

    return Object.keys(this.validationElement.errors)[ 0 ];
  }

  isInvalid(): boolean {
    return this.validationElement.errors && this.validationElement.touched;
  }

}
