import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProdutosPage } from './list-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: ListProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProdutosPageRoutingModule {}
