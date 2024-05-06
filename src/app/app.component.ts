import { AuthService } from 'src/app/services/auth.service';
import { Component} from '@angular/core';

interface SidenavToggle{
  screenWidth: number;
  collapse: boolean;
  smallScreen: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLoggedIn: boolean = false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onToggleSidenav(data: SidenavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapse;
  }
}
