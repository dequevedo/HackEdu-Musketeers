import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'read-book', loadChildren: './read-book/read-book.module#ReadBookPageModule' },
  { path: 'boletim', loadChildren: './boletim/boletim.module#BoletimPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },  { path: 'add-book', loadChildren: './add-book/add-book.module#AddBookPageModule' },
  { path: 'register-prof', loadChildren: './register-prof/register-prof.module#RegisterProfPageModule' },
  { path: 'leitura-detail', loadChildren: './leitura-detail/leitura-detail.module#LeituraDetailPageModule' },
  { path: 'criar-aviso', loadChildren: './criar-aviso/criar-aviso.module#CriarAvisoPageModule' },
  { path: 'criar-tarefa', loadChildren: './criar-tarefa/criar-tarefa.module#CriarTarefaPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
