import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroUsuariosPage } from './cadastro-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroUsuariosPageRoutingModule {}
