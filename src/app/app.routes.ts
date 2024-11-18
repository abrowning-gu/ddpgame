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
    path: 'quiz',
    loadComponent: () => import('./games/quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
 
];
