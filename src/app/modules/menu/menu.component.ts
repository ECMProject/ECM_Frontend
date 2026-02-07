import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  userName = localStorage.getItem('name');

  constructor() {
    if (this.userName) {
      this.userName = this.capitalizeFirstLetter(this.userName);
    }
  }

  ngOnInit(): void {

  }

  capitalizeFirstLetter(name: string): string {
    return name.toUpperCase();
  }
}
