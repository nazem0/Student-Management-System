import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student Management System';
  constructor(protected translateService: TranslateService) {
    (async () => {
        const ar = await import(`../assets/translations/ar.json`);
        const en = await import(`../assets/translations/en.json`);
        translateService.setTranslation('ar', ar);
        translateService.setTranslation('en', en);
        translateService.setDefaultLang('ar');
    })()
}
}
