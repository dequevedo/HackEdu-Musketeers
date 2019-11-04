import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CriarAvisoPage } from './criar-aviso.page';

const routes: Routes = [
  {
    path: '',
    component: CriarAvisoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriarAvisoPage]
})
export class CriarAvisoPageModule {}
