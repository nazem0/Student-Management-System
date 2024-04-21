import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
  ]
})
export class SharedModule { }
