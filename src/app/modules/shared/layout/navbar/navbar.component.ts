import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthHelper } from '../../../../helpers/auth-helper';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from '../../../../enums/languages.enum';
import { I18nHelper } from '../../../../helpers/i18n-helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageOptionsComponent } from './language-options/language-options.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarCollapsed = false;
  constructor(
    public authHelper: AuthHelper,
    private router: Router,
    private transalte: TranslateService,
    private i18nHelper: I18nHelper,
    private modalService: NgbModal
  ) { }

  logout() {
    this.authHelper.removeToken();
    this.router.navigate(['/auth/login'])
  }

  toggleLanguage() {
    console.log("toggle");
    console.log("OldLang", this.transalte.currentLang);

    if (I18nHelper.currentLang === Languages.Arabic) {
      this.i18nHelper.changeLanguage(Languages.English)
    }
    else {
      this.i18nHelper.changeLanguage(Languages.Arabic)
    }

    console.log("NewLang", this.transalte.currentLang);

  }

  openLanguageMenu() {
    const modalRef = this.modalService.open(LanguageOptionsComponent);
    modalRef.componentInstance.name = `openLanguageOptionsModalInstance${new Date().getTime()}`;

  }
}
