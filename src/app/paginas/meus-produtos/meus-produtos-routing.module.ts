import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusProdutosPage } from './meus-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusProdutosPageRoutingModule {}
