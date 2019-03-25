import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';

function _window(): any {

  return window;
}

@Injectable({
  providedIn: CoreModule
})
export class WindowService {
  get nativeWindow(): any {

    return _window();
  }
}
