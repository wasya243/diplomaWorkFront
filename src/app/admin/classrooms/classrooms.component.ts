import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ClassroomsService } from './classrooms.service';
import { DeleteClassroomModalComponent } from './delete-classroom-modal/delete-classroom-modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { IGridSortableColumnData } from '../../shared/grid/grid.module';
import { UpdateClassroomModalComponent } from './update-classroom-modal/update-classroom-modal.component';
import { CreateClassroomModalComponent } from './create-classroom-modal/create-classroom-modal.component';

import IClassroom = diploma.IClassroom;

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: [ './classrooms.component.scss' ]
})
export class ClassroomsComponent implements OnInit {

  classrooms: {
    items: Array<IClassroom>,
    metadata?: any
  } = {
    items: []
  };
  pencilAltIcon = faPencilAlt;
  trashIcon = faTrash;

  constructor(private classroomsService: ClassroomsService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.getClassrooms();
    this.classroomsService.onInitClassroomCreationSubject().subscribe(async () => {
      this.modalService.open(CreateClassroomModalComponent, { size: 'lg' })
        .then(() => {
          this.getClassrooms();
        })
        .catch(error => console.error(error));
    });
  }

  onSortChange(sortData: IGridSortableColumnData) {
    console.log(sortData);
    // TODO: return back when respective functionality is implemented on the backend
    // this.usersService.getUsers(sortData)
    //   .subscribe(data => {
    //     this.users.items = data;
    //   });
  }

  onEditClassroom(clickedRow: IClassroom): void {
    this.modalService.open(UpdateClassroomModalComponent, { size: 'sm' }, clickedRow)
      .then(data => {
        this.classrooms.items.map(
          (classroom: IClassroom) => {
            return classroom.id === (data as IClassroom).id && Object.assign(classroom, data);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onRemoveClassroom(clickedRow: IClassroom): void {
    this.modalService.open(DeleteClassroomModalComponent, { size: 'sm' }, clickedRow)
      .then((id) => {
        this.classrooms.items = this.classrooms.items.filter((classroom: IClassroom) => classroom.id !== id);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private getClassrooms(): void {
    this.classroomsService.getClassrooms()
      .subscribe(data => {
        this.classrooms.items = data;
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
