import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateNumberPipe } from './pipes/translate-number.pipe';
import { LanguageOptionsComponent } from './layout/navbar/language-options/language-options.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    TranslateNumberPipe,
    LanguageOptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    TranslateModule,
  ],
  exports: [
    NgbModule,
    HttpClientModule,
    TranslateModule,
    TranslateNumberPipe
  ],
})
export class SharedModule { }
