import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { navbarItems } from './nav.items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  isCollapsed = false;
  userName = localStorage.getItem('name');
  userRole = localStorage.getItem('userRole');
  navItems = navbarItems;
  filteredNavbarItems: typeof navbarItems;

  constructor(private authService: AuthService) {
    this.filteredNavbarItems = this.getFilteredNavbarItems();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
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

}
