import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './enums/languages.enum';
import { I18nHelper } from './helpers/i18n-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student Management System';
  constructor(
    protected translateService: TranslateService,
    private i18nHelper:I18nHelper
    ) {
    (async () => {
      const ar = await import(`../assets/i18n/ar.json`);
      const en = await import(`../assets/i18n/en.json`);
      translateService.setTranslation(Languages.Arabic, ar);
      translateService.setTranslation(Languages.English, en);
      translateService.setDefaultLang(Languages.Arabic);
      translateService.currentLang = Languages.Arabic;
      i18nHelper.applyDirection(Languages.Arabic);
    })()
  }
}
