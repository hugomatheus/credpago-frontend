import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlListComponent } from './url-list/url-list.component';

const routes: Routes = [
  {
    path: '',
    component: UrlListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlsRoutingModule { }
