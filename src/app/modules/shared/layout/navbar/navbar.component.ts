import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarCollapsed = false;
  navLinks: { routeLink: string, label: string }[] = []
  constructor(){
    this.navLinks = [
      {label:"Login", routeLink:"/auth/login"},
      {label:"Register", routeLink:"/auth/register"},
    ]
  }
}
