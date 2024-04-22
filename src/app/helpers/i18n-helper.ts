import { Languages } from './../enums/languages.enum';
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class I18nHelper {

    constructor(private translateService: TranslateService) {

    }
    changeLanguage(language: Languages) {
        this.translateService.currentLang = language;
    }

    applyDirection(language: Languages) {
        if (language === Languages.Arabic)
            document.dir = "rtl"
        else {
            document.dir = "ltr"
        }
        this.loadStyle(language)
    }

    loadStyle(language: Languages) {
        let bootstrapFileName = language === Languages.English ?
            "bootstrap.min.css" : "bootstrap.rtl.min.css"
        console.log(bootstrapFileName);

        const head = document.getElementsByTagName('head')[0];

        let themeLink = document.getElementById(
            'client-theme'
        ) as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `assets/bootstrap/${bootstrapFileName}`; //<--add assets
        } else {
            const style = document.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = `assets/bootstrap/${bootstrapFileName}`;

            head.appendChild(style);
        }
    }
}