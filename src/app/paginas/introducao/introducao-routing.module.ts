import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroducaoPage } from './introducao.page';

const routes: Routes = [
  {
    path: '',
    component: IntroducaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroducaoPageRoutingModule {}
