import { Languages } from './../enums/languages.enum';
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class I18nHelper {
    readonly languageKey = "RoboostStudentManagementSystemLanguage";
    public static currentLang = ""
    constructor(
        private translateService: TranslateService,
        ) {

    }
    storeLanguagePereference(language: Languages) {
        localStorage.setItem(this.languageKey, JSON.stringify(language))
        I18nHelper.currentLang = language;
    }
    getLanguagePereference(): Languages {
        let languageStringified = localStorage.getItem(this.languageKey)
        if (languageStringified) {
            return JSON.parse(languageStringified)
        }
        return Languages.Arabic
    }
    changeLanguage(language: Languages) {
        this.translateService.setDefaultLang(language)
        I18nHelper.currentLang = language;
        this.translateService.use(language)
        this.storeLanguagePereference(language);
        this.applyDirection(language);
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
        let bootstrapFileName = language === Languages.Arabic ?
        "bootstrap.rtl.min.css" : "bootstrap.min.css"
        console.log(bootstrapFileName);

        const head = document.getElementsByTagName('head')[0];

        let themeLink = document.getElementById(
            'client-theme'
        ) as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `assets/bootstrap/${bootstrapFileName}`;
        } else {
            const style = document.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = `assets/bootstrap/${bootstrapFileName}`;
            head.appendChild(style);
        }
    }
    async InitLocalization() {
        const ar = await import(`../../assets/i18n/ar.json`);
        const en = await import(`../../assets/i18n/en.json`);
        const fr = await import(`../../assets/i18n/fr.json`);
        const es = await import(`../../assets/i18n/es.json`);
        this.translateService.setTranslation(Languages.Arabic, ar);
        this.translateService.setTranslation(Languages.English, en);
        this.translateService.setTranslation(Languages.French, fr);
        this.translateService.setTranslation(Languages.Spanish, es);
        let preferredLanguage = this.getLanguagePereference()
        this.translateService.setDefaultLang(preferredLanguage);
        this.storeLanguagePereference(preferredLanguage);
        this.applyDirection(preferredLanguage);
    }
}