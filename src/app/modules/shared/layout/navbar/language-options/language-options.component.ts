import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Languages } from '../../../../../enums/languages.enum';
import { I18nHelper } from '../../../../../helpers/i18n-helper';

@Component({
  selector: 'app-language-options',
  templateUrl: './language-options.component.html',
  styleUrl: './language-options.component.css'
})
export class LanguageOptionsComponent {
  languages: { img: string, key: Languages }[] = []
  constructor(
    public activeModal: NgbActiveModal,
    private i18nHelper:I18nHelper
  ) {
    this.languages=[
      { img: '/assets/png/egypt.png', key: Languages.Arabic },
      { img: '/assets/png/us.png', key: Languages.English },
      { img: '/assets/png/france.png', key: Languages.French },
      { img: '/assets/png/spain.png', key: Languages.Spanish },
      { img: '/assets/png/de.png', key: Languages.Germany }
    ]
  }
  changeLanguage(language:Languages){
    this.i18nHelper.changeLanguage(language)
  }
}
