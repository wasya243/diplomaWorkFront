import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from '../../../core/validation.service';
import { ModalService } from '../../../shared/modal/modal.service';
import { GroupsService } from '../../../shared/groups.service';
import { FacultiesService } from '../../../shared/faculties.service';

import IFaculty = diploma.IFaculty;

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: [ './create-group-modal.component.scss' ]
})
export class CreateGroupModalComponent implements OnInit {

  groupForm: FormGroup;
  faculties: Array<IFaculty>;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private groupsService: GroupsService,
    private facultiesService: FacultiesService
  ) {
  }

  ngOnInit() {
    this.groupForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
      amountOfPeople: [ null, [ Validators.required, ValidationService.amountOfPeopleValidator ] ],
      yearStart: [ null, [ Validators.required, ValidationService.groupYearValidator ] ],
      yearEnd: [ null, [ Validators.required, ValidationService.groupYearValidator ] ],
      facultyId: [ null, [ Validators.required ] ],
    });
    this.getFaculties();
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    this.groupsService.createGroup(this.groupForm.value)
      .subscribe(createdGroup => {
          this.modalService.apply(createdGroup);
        },
        error => {
          console.error(error);
        });
  }

  private getFaculties(): void {
    this.facultiesService.getFaculties()
      .subscribe(faculties => {
        this.faculties = faculties;
      }, error => console.error(error));
  }
}
