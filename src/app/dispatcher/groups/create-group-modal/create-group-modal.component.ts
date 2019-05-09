import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from '../../../core/validation.service';
import { ModalService } from '../../../shared/modal/modal.service';
import { GroupsService } from '../../../shared/groups.service';
import { StorageService } from '../../../core/storage.service';

import ICreateGroup = diploma.ICreateGroup;
import IUser = diploma.IUser;

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: [ './create-group-modal.component.scss' ]
})
export class CreateGroupModalComponent implements OnInit {

  groupForm: FormGroup;
  private userData: IUser;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private groupsService: GroupsService,
    private storageService: StorageService
  ) {
    this.userData = this.storageService.getUserData().userInfo as IUser;
  }

  ngOnInit() {
    this.groupForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
      amountOfPeople: [ null, [ Validators.required, ValidationService.amountOfPeopleValidator ] ],
      yearStart: [ null, [ Validators.required, ValidationService.groupYearValidator ] ],
      yearEnd: [ null, [ Validators.required, ValidationService.groupYearValidator ] ]
    });
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const facultyId = this.userData.facultyId;
    const groupData: ICreateGroup = Object.assign(this.groupForm.value, { facultyId });
    this.groupsService.createGroup(groupData)
      .subscribe(createdGroup => {
          this.modalService.apply(createdGroup);
        },
        error => {
          console.error(error);
        });
  }
}
