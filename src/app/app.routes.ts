import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Register } from './components/pages/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
];
