import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: [ './admin-container.component.scss' ]
})
export class AdminContainerComponent implements OnInit {

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
