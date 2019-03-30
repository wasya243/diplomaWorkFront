import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { IGridSortableColumnData } from './grid.module';

@Injectable()
export class GridService {
  private sortableColumnNames: Array<string> = [];
  private sortChangeSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  onSortChange = this.sortChangeSubject.asObservable();

  constructor() {
  }

  addSortableColumn(columnData: IGridSortableColumnData) {
    !this.sortableColumnNames.indexOf(columnData.sortName) && this.sortableColumnNames.push(columnData.sortName);
  }

  sortChange(sortData: IGridSortableColumnData, isInitial?: boolean) {
    this.sortChangeSubject.next({ sortData, isInitial });
  }

}
