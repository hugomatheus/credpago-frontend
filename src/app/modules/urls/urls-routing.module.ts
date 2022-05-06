import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseStructureComponent } from '../shared/components/base-structure/base-structure.component';
import { UrlCreateComponent } from './url-create/url-create.component';
import { UrlDetailsComponent } from './url-details/url-details.component';
import { UrlListComponent } from './url-list/url-list.component';

const routes: Routes = [
  {
    path: '',
    component: BaseStructureComponent,
    children: [
      {
        path: 'list',
        component: UrlListComponent
      },
      {
        path: 'create',
        component: UrlCreateComponent
      },
      {
        path: 'details/:uuid',
        component: UrlDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlsRoutingModule { }
