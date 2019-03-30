import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faSort, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { GridService } from '../grid.service';
import { Subscription } from 'rxjs';
import { IGridSortableColumnData } from '../grid.module';

@Component({
  selector: 'brz-grid-head-cell',
  templateUrl: './grid-head-cell.component.html',
  styleUrls: [ './grid-head-cell.component.scss' ],
})
export class GridHeadCellComponent implements OnInit, OnDestroy {
  @Input() sortName: string;
  sortChangeSubscription: Subscription;
  sortConfig: IGridSortableColumnData;

  // need for sort icon on template
  sortDown = faSortDown;
  sort = faSort;

  constructor(private gridService: GridService) {
  }

  ngOnInit() {
    if (this.sortName) {
      this.sortConfig = { sortName: this.sortName };
      this.gridService.addSortableColumn(this.sortConfig);
      this.sortChangeSubscription = this.gridService.onSortChange.subscribe(data => {
        data && this.handleSortChange(data.sortData);
      });
    }
  }

  ngOnDestroy() {
    this.sortChangeSubscription && this.sortChangeSubscription.unsubscribe();
  }

  click() {
    if (this.sortConfig) {
      this.sortConfig.sortDirection = this.sortConfig.sortDirection === 'asc' ? 'desc' : 'asc';
      this.gridService.sortChange(this.sortConfig);
    }
  }

  private handleSortChange(sortData: IGridSortableColumnData) {
    if (this.sortConfig.sortName === sortData.sortName) {
      this.sortConfig.sortDirection = sortData.sortDirection;
      return;
    }

    this.sortConfig.sortDirection = null;
  }
}
