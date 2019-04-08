import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { FacultiesService } from '../../../shared/faculties.service';

@Component({
  selector: 'app-create-faculty-modal',
  templateUrl: './create-faculty-modal.component.html',
  styleUrls: [ './create-faculty-modal.component.scss' ]
})
export class CreateFacultyModalComponent implements OnInit {

  facultyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private facultiesService: FacultiesService
  ) {
    this.facultyForm = this.fb.group({
      director: [ '', [ Validators.required ] ],
      name: [ '', [ Validators.required ] ],
      website: [ '', [ Validators.required ] ],
      address: [ '', [ Validators.required ] ],
      phoneNumber: [ '', [ Validators.required ] ]
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    this.facultiesService.createFaculty(this.facultyForm.value)
      .subscribe(createdFaculty => {
          this.modalService.apply(createdFaculty);
        },
        error => {
          console.error(error);
        });
  }

}
