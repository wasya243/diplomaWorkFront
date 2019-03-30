import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GridComponent } from './grid.component';
import { GridHeadCellComponent } from './grid-head-cell/grid-head-cell.component';
import { GridRowCellComponent } from './grid-row-cell/grid-row-cell.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    GridComponent,
    GridHeadCellComponent,
    GridRowCellComponent
  ],
  exports: [
    GridComponent,
    GridHeadCellComponent,
    GridRowCellComponent
  ]
})
export class GridModule {
}

export interface IGridSortableColumnData {
  sortName: string;
  sortDirection?: 'asc' | 'desc';
}
