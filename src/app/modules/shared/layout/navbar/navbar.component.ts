import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthHelper } from '../../../../helpers/auth-helper';
import { TranslateService } from '@ngx-translate/core';

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
    private router:Router,
    private transalte:TranslateService
  ){
    
    this.navLinks = [
      {label:this.transalte.instant("Students_list"), routeLink:"/student/list"},
    ]
  }

  logout(){
    this.authHelper.removeToken();
    this.router.navigate(['/auth/login'])
  }
}
