export class Alert {
  type: AlertType;
  message: string;
  timeout: number;

  constructor(type: AlertType, message: string, timeout: number) {
    this.type = type;
    this.message = message;
    this.timeout = timeout;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
