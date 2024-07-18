import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: 'games/flipcard',
    loadComponent: () => import('./games/flipcard/flipcard.page').then( m => m.FlipcardPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'games/tilegame',
    loadComponent: () => import('./games/tilegame/tilegame.page').then( m => m.TilegamePage)
  },
 
];
