import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

import { GridService } from './grid.service';
import { IGridSortableColumnData } from './grid.module';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: [ './grid.component.scss' ],
  providers: [ GridService ]
})
export class GridComponent implements OnInit {
  @Input() initialSort: IGridSortableColumnData;
  @Input() items: Array<any> = [];
  @Input() expandable = false;
  @Output() onSortChange = new EventEmitter();

  constructor(private gridService: GridService) {
    this.gridService.onSortChange.subscribe(data => this.handleSort(data));
  }

  @ContentChild('gridRowTemplate') gridRowTemplate: TemplateRef<ElementRef>;
  @ContentChild('gridRowCollapsibleTemplate') gridRowCollapsibleTemplate: TemplateRef<ElementRef>;
  @ContentChild('gridHeadTemplate') gridHeadTemplate: TemplateRef<ElementRef>;

  ngOnInit() {
    this.initialSort && this.gridService.sortChange(this.initialSort, true);
  }

  get gridContext() {
    return this;
  }

  private handleSort(sortInfo) {
    if (sortInfo && !sortInfo.isInitial) {
      return this.onSortChange.emit(sortInfo.sortData);
    }

    // this.items.sort((a, b) => {
    //   const {sortName, sortDirection} = data;
    //   let sortDirectionModifier = 1;
    //   if (sortDirection === 'desc') {
    //     sortDirectionModifier = -1;
    //   }
    //   const result = (a[sortName] > b[sortName]) ? 1 : (a[sortName] < b[sortName]) ? -1 : 0;
    //   return result * sortDirectionModifier;
    // });
  }

  onRowClicked(rowItem) {
    if (!this.expandable) {
      return;
    }

    if (rowItem.isExpanded) {
      return rowItem.isExpanded = false;
    }

    this.items.forEach(item => {
      item.isExpanded && (item.isExpanded = false);
    });

    rowItem.isExpanded = true;
  }

}
