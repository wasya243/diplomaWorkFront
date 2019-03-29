import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../auth/auth.service';
import { StorageService } from '../../core/storage.service';

import IUser = diploma.IUser;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

  userData: IUser;
  signOutIcon = faSignOutAlt;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.userData = this.storageService.getUserData().userInfo as IUser;
  }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout()
      .subscribe(resp => {
        this.router.navigate([ 'login' ]);
      }, error => {
        // TODO: maybe log errors?
        console.error(error);
      });
  }

}
