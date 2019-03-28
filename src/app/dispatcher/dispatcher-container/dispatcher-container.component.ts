import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dispatcher-container',
  templateUrl: './dispatcher-container.component.html',
  styleUrls: [ './dispatcher-container.component.scss' ]
})
export class DispatcherContainerComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout()
      .subscribe(resp => {
          this.router.navigate([ 'login' ]);
        },
        error => {
          console.error(error);
        });
  }

}
