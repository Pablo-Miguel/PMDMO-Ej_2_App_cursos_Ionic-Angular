import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inicial-page/inicial-page.module').then( m => m.InicialPagePageModule)
  },
  {
    path: 'detalles/:id',
    loadChildren: () => import('./details-page/details-page.module').then( m => m.DetailsPagePageModule)
  },
  {
    path: 'inicial-page',
    redirectTo: 'inicial-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
