import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlsRoutingModule } from './urls-routing.module';
import { UrlListComponent } from './url-list/url-list.component';


@NgModule({
  declarations: [
    UrlListComponent
  ],
  imports: [
    CommonModule,
    UrlsRoutingModule
  ]
})
export class UrlsModule { }
