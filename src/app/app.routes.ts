import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Register } from './components/pages/register/register';
import { Login } from './components/pages/login/login';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'register', component: Register },
  {
    path: 'login',
    component: Login,
  },
];
