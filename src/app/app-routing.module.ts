import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { CadastroComponent } from './component/cadastro/cadastro.component';
import { HomeComponent } from './component/home/home.component';
import { NotAuthorizedComponent } from './component/not-authorized/not-authorized.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: CadastroComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
