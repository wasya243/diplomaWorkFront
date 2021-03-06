import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FacultiesService } from '../../shared/faculties.service';
import { ModalService } from '../../shared/modal/modal.service';
import { IGridSortableColumnData } from '../../shared/grid/grid.module';
import { DeleteFacultyModalComponent } from './delete-faculty-modal/delete-faculty-modal.component';
import { UpdateFacultyModalComponent } from './update-faculty-modal/update-faculty-modal.component';
import { CreateFacultyModalComponent } from './create-faculty-modal/create-faculty-modal.component';

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
    this.getFaculties();
    this.facultiesService.onInitFacultyCreationSubject().subscribe(async () => {
      this.modalService.open(CreateFacultyModalComponent, { size: 'lg' })
        .then(() => {
          this.getFaculties();
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

  onEditFaculty(clickedRow: IFaculty): void {
    this.modalService.open(UpdateFacultyModalComponent, { size: 'sm' }, clickedRow)
      .then(data => {
        this.faculties.items.map(
          (faculty: IFaculty) => {
            return faculty.id === (data as IFaculty).id && Object.assign(faculty, data);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onRemoveFaculty(clickedRow: IFaculty): void {
    this.modalService.open(DeleteFacultyModalComponent, { size: 'sm' }, clickedRow)
      .then((id) => {
        this.faculties.items = this.faculties.items.filter((faculty: IFaculty) => faculty.id !== id);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private getFaculties(): void {
    this.facultiesService.getFaculties()
      .subscribe(data => {
        this.faculties.items = data;
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }
}
