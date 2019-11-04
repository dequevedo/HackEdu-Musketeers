import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CriarTarefaPage } from './criar-tarefa.page';

const routes: Routes = [
  {
    path: '',
    component: CriarTarefaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriarTarefaPage]
})
export class CriarTarefaPageModule {}
