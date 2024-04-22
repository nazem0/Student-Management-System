import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './modules/shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Http } from './interceptors/http.interceptor';
import { AuthHelper } from './helpers/auth-helper';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nHelper } from './helpers/i18n-helper';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide:HTTP_INTERCEPTORS,
      useClass:Http,
      multi:true
    },
    {
      provide:MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue:{
        duration:3500
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
