import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../shared/modal/modal.service';
import { FacultiesService } from '../faculties.service';

import IFaculty = diploma.IFaculty;

@Component({
  selector: 'app-update-faculty-modal',
  templateUrl: './update-faculty-modal.component.html',
  styleUrls: [ './update-faculty-modal.component.scss' ]
})
export class UpdateFacultyModalComponent implements OnInit {

  @Input() data: IFaculty;

  facultyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private facultiesService: FacultiesService
  ) {
  }

  ngOnInit() {
    this.facultyForm = this.fb.group({
      director: [ this.data.director, [ Validators.required ] ],
      name: [ this.data.name, [ Validators.required ] ],
      website: [ this.data.website, [ Validators.required ] ],
      address: [ this.data.address, [ Validators.required ] ],
      phoneNumber: [ this.data.phoneNumber, [ Validators.required ] ]
    });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    this.facultiesService.updateFaculty(this.data.id, this.facultyForm.value)
      .subscribe((updatedUser: IFaculty) => {
          this.modalService.apply(updatedUser);
        },
        error => {
          console.error(error);
        });
  }

}
