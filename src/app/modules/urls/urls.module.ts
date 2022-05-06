import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlsRoutingModule } from './urls-routing.module';
import { UrlListComponent } from './url-list/url-list.component';
import { SharedModule } from '../shared/shared.module';
import { UrlCreateComponent } from './url-create/url-create.component';
import { UrlDetailsComponent } from './url-details/url-details.component';


@NgModule({
  declarations: [
    UrlListComponent,
    UrlCreateComponent,
    UrlDetailsComponent
  ],
  imports: [
    CommonModule,
    UrlsRoutingModule,
    SharedModule
  ]
})
export class UrlsModule { }
