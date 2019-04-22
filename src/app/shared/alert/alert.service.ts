import { Injectable } from '@angular/core';

import { Alert, AlertType } from './alert.model';

@Injectable()
export class AlertService {

  static ALERT_TIMEOUT_MS = 3000;
  private alerts: Alert[] = [];

  constructor() {
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }

  removeAlert(alert: Alert): void {
    this.alerts = this.alerts.filter(item => item !== alert);
  }

  success(message: string, timeout?: number) {
    this.alert(AlertType.Success, message, timeout);
  }

  error(message: string, timeout?: number) {
    console.log('alert service error', message);
    this.alert(AlertType.Error, message, timeout);
  }

  info(message: string, timeout?: number) {
    this.alert(AlertType.Info, message, timeout);
  }

  warn(message: string, timeout?: number) {
    this.alert(AlertType.Warning, message, timeout);
  }

  alert(type: AlertType, message: string, timeout = AlertService.ALERT_TIMEOUT_MS) {
    const alert = new Alert(type, message, timeout);
    if (Number.isFinite(timeout)) {
      setTimeout(() => {
        this.removeAlert(alert);
      }, timeout);
    }
    this.alerts.push(alert);
  }

  clear(): void {
    this.alerts.length = 0;
  }
}
