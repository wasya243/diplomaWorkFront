import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalService } from '../../../shared/modal/modal.service';
import { GroupsService } from '../../../shared/groups.service';
import { ValidationService } from '../../../core/validation.service';

import IGroup = diploma.IGroup;

@Component({
  selector: 'app-update-faculty-modal',
  templateUrl: './update-group-modal.component.html',
  styleUrls: [ './update-group-modal.component.scss' ]
})
export class UpdateGroupModalComponent implements OnInit {

  @Input() data: IGroup;

  groupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private groupsService: GroupsService
  ) {
  }

  ngOnInit() {
    this.groupForm = this.fb.group({
      name: [ this.data.name, [ Validators.required ] ],
      amountOfPeople: [ this.data.amountOfPeople, [ Validators.required, ValidationService.amountOfPeopleValidator ] ],
      yearStart: [ this.data.yearStart, [ Validators.required, ValidationService.groupYearValidator ] ],
      yearEnd: [ this.data.yearEnd, [ Validators.required, ValidationService.groupYearValidator ] ]
    });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const formValue = this.groupForm.value;

    const dataToUpdate = {
      amountOfPeople: formValue.amountOfPeople,
      name: formValue.name,
      yearStart: formValue.yearStart,
      yearEnd: formValue.yearEnd
    };

    this.groupsService.updateGroup(this.data.id, dataToUpdate)
      .subscribe((updatedGroup: IGroup) => {
          this.modalService.apply(updatedGroup);
        },
        error => {
          console.error(error);
        });
  }

}
