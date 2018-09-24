import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { EditstoryComponent } from './editstory/editstory.component';

const appRoutes: Routes = [
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // },
  { path: 'editstory', component: EditstoryComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
