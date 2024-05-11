import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './core/auth/auth-page.component';
import { HttpClientModule } from '@angular/common/http'; // Добавленный импорт
import { MainPageComponent } from './core/main/main-page/main-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Перенаправление пустого пути на '/auth'
  { path: 'auth', component: AuthPageComponent },
  { path: 'main', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
