import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { navbarItems } from './nav.items';

interface SidenavToggle{
  screenWidth: number;
  collapse: boolean;
  smallScreen: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{
  @Input() smallScreen = false;
  @Output() onToggleSidenav: EventEmitter<SidenavToggle>=new EventEmitter();
  screenWidth = 0;

  isCollapsed = false;
  isMobileSidebarVisible = false;
  userName = localStorage.getItem('name');
  userRole = localStorage.getItem('userRole');
  navItems = navbarItems;
  filteredNavbarItems: typeof navbarItems;

  constructor(private authService: AuthService) {
    this.filteredNavbarItems = this.getFilteredNavbarItems();
    if (this.userName) {
      this.userName = this.capitalizeFirstLetter(this.userName);
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapse: this.isCollapsed, smallScreen: this.smallScreen});
  }

  toggleMobileSidebar() {
    this.isMobileSidebarVisible = !this.isMobileSidebarVisible;
    console.log(this.isMobileSidebarVisible);
  }

  getFilteredNavbarItems() {
    // console.log("Role: ", this.userRole);
    // console.log("Name: ", this.userName);
    if (this.userRole == '3') {
      // Si es Administrador, mostrar todos los elementos
      return navbarItems;
      
    } else if (this.userRole == '2') {
      // Si es Profesor, filtrar elementos no permitidos
      return navbarItems.filter(item => {
        return !['search'].includes(item.routerLink);
      });
    } else {
      // Si es Estudiante, filtrar elementos no permitidos
      return navbarItems.filter(item => {
        return !['courses','search'].includes(item.routerLink);
      });
    }
  }

  setLoginFalse(){
    this.authService.setLoggedIn(false);
  }

  capitalizeFirstLetter(name: string): string {
    return name.toUpperCase();
  }

}
