import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StorageService } from './shared/storage.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  opened = true;
  isLoggedIn = false;
  username?: string;
  @ViewChild('sidenav',{static:true}) sidenav: MatSidenav;

  constructor(
    private storageService: StorageService, private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }

    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }
}
