import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarFotoPage } from './adicionar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarFotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarFotoPageRoutingModule {}
