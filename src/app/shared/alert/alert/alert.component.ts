import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from '../alert.model';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: [ './alert.component.scss' ]
})

export class AlertComponent implements OnInit {
  classNamesByType: Map<AlertType, any>;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.classNamesByType = getCssClassesByName();
  }

  get alerts(): Alert[] {

    return this.alertService.getAlerts();
  }

  getCssClassName(alert: Alert, cssClass: string): string {

    return this.classNamesByType.get(alert.type)[ cssClass ];
  }

  removeAlert(alert: Alert): void {
    this.alertService.removeAlert(alert);
  }

}

function getCssClassesByName(): Map<AlertType, any> {
  const map = new Map();

  map.set(AlertType.Success, { alert: 'alert alert-success', notificationIcon: 'fa fa-check' });
  map.set(AlertType.Error, { alert: 'alert alert-danger', notificationIcon: 'fa fa-exclamation-triangle' });
  map.set(AlertType.Warning, { alert: 'alert alert-info', notificationIcon: 'fa fa-info-circle' });
  map.set(AlertType.Info, { alert: 'alert alert-warning', notificationIcon: 'fa fa-exclamation-triangle' });

  return map;
}
