declare namespace diploma {

  /*
  * for more details look to ng bootstrap modal API
  * https://ng-bootstrap.github.io/#/components/modal/api
  */
  interface IModalConfig {
    size?: 'sm' | 'lg';
    centered?: boolean;
    backdrop?: boolean | 'static';
    keyboard?: boolean;
  }
}
