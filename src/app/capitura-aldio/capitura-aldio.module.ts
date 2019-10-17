import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CapituraAldioPage } from './capitura-aldio.page';

const routes: Routes = [
  {
    path: '',
    component: CapituraAldioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CapituraAldioPage]
})
export class CapituraAldioPageModule {}
