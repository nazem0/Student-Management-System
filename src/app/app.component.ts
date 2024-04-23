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
  constructor(
    protected translateService: TranslateService,
    private i18nHelper: I18nHelper
  ) {}
  async ngOnInit() {
    await this.i18nHelper.InitLocalization();
  }    
}
