import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'supers',
    loadChildren: () => import('./supers/supers.module').then( m => m.SupersModule),
  },
  {
    path: '',
    redirectTo: 'supers',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'notFound',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
