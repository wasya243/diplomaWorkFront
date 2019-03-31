import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FacultiesService } from './faculties.service';
import { ModalService } from '../../shared/modal/modal.service';
import { IGridSortableColumnData } from '../../shared/grid/grid.module';
import { DeleteFacultyModalComponent } from './delete-faculty-modal/delete-faculty-modal.component';

import IFaculty = diploma.IFaculty;

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: [ './faculties.component.scss' ]
})
export class FacultiesComponent implements OnInit {

  faculties: {
    items: Array<IFaculty>,
    metadata?: any
  } = {
    items: []
  };
  pencilAltIcon = faPencilAlt;
  trashIcon = faTrash;

  constructor(private facultiesService: FacultiesService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.facultiesService.getFaculties()
      .subscribe(data => {
        this.faculties.items = data;
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

  onEditFaculty(clickedRow: IFaculty): void {
    console.log(clickedRow);
    // this.modalService.open(UpdateUserModalComponent, { size: 'sm' }, clickedRow)
    //   .then(data => {
    //     this.users.items.map(
    //       (user: IUser) => {
    //         return user.id === (data as IUser).id && Object.assign(user, data);
    //       });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  onRemoveFaculty(clickedRow: IFaculty): void {
    console.log(clickedRow);
    this.modalService.open(DeleteFacultyModalComponent, { size: 'sm' }, clickedRow)
      .then((id) => {
        this.faculties.items = this.faculties.items.filter((faculty: IFaculty) => faculty.id !== id);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
