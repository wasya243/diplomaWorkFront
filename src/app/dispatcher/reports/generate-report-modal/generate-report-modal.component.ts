import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { ModalService } from '../../../shared/modal/modal.service';

@Component({
  selector: 'app-generate-report-modal',
  templateUrl: './generate-report-modal.component.html',
  styleUrls: [ './generate-report-modal.component.scss' ]
})
export class GenerateReportModalComponent implements OnInit {

  reportForm: FormGroup;
  calendarIcon = faCalendar;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.reportForm = this.fb.group({
      start: [ null, [ Validators.required ] ],
      end: [ null, [ Validators.required ] ]
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    this.modalService.dismiss();
  }

  save(): void {
    const { start, end } = this.reportForm.value;
    this.modalService.apply({
      start: this.getFullDate(start.year, start.day, start.month),
      end: this.getFullDate(end.year, end.day, end.month)
    });
  }

  private getFullDate(year: number, day: number, month: number): string {
    return `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day}`;
  }

}
