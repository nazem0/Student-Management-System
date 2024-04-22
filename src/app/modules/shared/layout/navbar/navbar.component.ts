import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthHelper } from '../../../../helpers/auth-helper';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarCollapsed = false;
  navLinks: { routeLink: string, label: string }[] = []
  constructor(
    public authHelper:AuthHelper,
    private router:Router
  ){
    
    this.navLinks = [
      {label:"Login", routeLink:"/auth/login"},
      {label:"Register", routeLink:"/auth/register"},
    ]
  }

  logout(){
    this.authHelper.removeToken();
    this.router.navigate(['/auth/login'])
  }
}
