import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ClassroomsService } from './classrooms.service';
import { DeleteClassroomModalComponent } from './delete-classroom-modal/delete-classroom-modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { IGridSortableColumnData } from '../../shared/grid/grid.module';

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
    this.classroomsService.getClassrooms()
      .subscribe(data => {
        this.classrooms.items = data;
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
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
    console.log(clickedRow);
    // this.modalService.open(UpdateFacultyModalComponent, { size: 'sm' }, clickedRow)
    //   .then(data => {
    //     this.faculties.items.map(
    //       (faculty: IFaculty) => {
    //         return faculty.id === (data as IFaculty).id && Object.assign(faculty, data);
    //       });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
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

}
