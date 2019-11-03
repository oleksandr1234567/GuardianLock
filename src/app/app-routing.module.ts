// Kristofer McCormick 1803203 & Oleksandr Zakirov 1802341

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'details/:id', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
