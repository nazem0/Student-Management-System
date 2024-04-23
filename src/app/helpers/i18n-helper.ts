import { Languages } from '../enums/languages.enum';
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class I18nHelper {
    readonly languageKey = "RoboostStudentManagementSystemLanguage";
    public currentLang = ""
    public currentLoadedBootstrap = ""
    public loadedLangs: Languages[] = []
    constructor(
        private translateService: TranslateService,
    ) {

    }
    async storeLanguagePereference(language: Languages) {
        localStorage.setItem(this.languageKey, JSON.stringify(language))
        this.currentLang = language
        
        //dynamicalled loaded based on user language prefrance

        if (!this.loadedLangs.includes(language)) {
            try {
                console.warn("loaded language ==>", language);
                let loadedLang = await import(`../../assets/i18n/${language}.json`)
                this.translateService.setTranslation(language, loadedLang);
                this.loadedLangs.push(language)
            }
            catch {
                //switch to default language if encountered miss input
                let loadedLang = await import(`../../assets/i18n/ar.json`)
                this.translateService.setTranslation(Languages.Arabic, loadedLang);
            }
        }
    }
    getLanguagePereference(): Languages {
        let languageStringified = localStorage.getItem(this.languageKey)
        if (languageStringified) {
            return JSON.parse(languageStringified)
        }
        return Languages.Arabic
    }
    async changeLanguage(language: Languages) {
        this.translateService.setDefaultLang(language)
        this.currentLang = language;
        this.translateService.use(language)
        await this.storeLanguagePereference(language);
        this.applyDirection(language);
    }

    applyDirection(language: Languages): boolean {
        if (language === Languages.Arabic) {
            document.dir = "rtl"
        }
        else {
            document.dir = "ltr"
        }
        return this.loadStyle(language)
    }

    loadStyle(language: Languages): boolean {
        let bootstrapFileName = language === Languages.Arabic ?
            "bootstrap.rtl.min.css" : "bootstrap.min.css"

        if (bootstrapFileName == this.currentLoadedBootstrap) return true;

        this.currentLoadedBootstrap = bootstrapFileName;
        let cssLocation = `assets/bootstrap/${bootstrapFileName}`
        return this.addStyleSheet(cssLocation);
    }

    addStyleSheet(cssLocation: string): boolean {
        const head = document.getElementsByTagName('head')[0];

        let themeLink = document.getElementById(
            'client-theme'
        ) as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = cssLocation;
        } else {
            const style = document.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = cssLocation;
            head.appendChild(style);
        }
        return true;
    }
    async InitLocalization(): Promise<boolean> {
        // Replaced to be dynamicalled loaded based on user language prefrance
        //#region Old Language Loading Mechanism
        // const ar = await import(`../../assets/i18n/ar.json`);
        // const en = await import(`../../assets/i18n/en.json`);
        // const fr = await import(`../../assets/i18n/fr.json`);
        // const es = await import(`../../assets/i18n/es.json`);
        // this.translateService.setTranslation(Languages.Arabic, ar);
        // this.translateService.setTranslation(Languages.English, en);
        // this.translateService.setTranslation(Languages.French, fr);
        // this.translateService.setTranslation(Languages.Spanish, es);
        //#endregion
        let preferredLanguage = this.getLanguagePereference()
        this.translateService.setDefaultLang(preferredLanguage);
        await this.storeLanguagePereference(preferredLanguage);
        return this.applyDirection(preferredLanguage);
    }
}