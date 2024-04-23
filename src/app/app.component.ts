import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './enums/languages.enum';
import { I18nHelper } from './helpers/i18n-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Student Management System';
  styleLoaded?: boolean;
  constructor(
    protected translateService: TranslateService,
    private i18nHelper: I18nHelper
  ) { }
  async ngOnInit() {
    //avoiding random exception happens if localizations json files are not loaded correctly
    await this.i18nHelper
    .InitLocalization()
    .then((v) => this.styleLoaded = v)
    .catch(()=>location.reload())
  }
}
