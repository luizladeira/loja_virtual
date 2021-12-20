import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarProdutosPage } from './editar-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: EditarProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarProdutosPageRoutingModule {}
