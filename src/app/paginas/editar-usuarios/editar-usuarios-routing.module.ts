import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarUsuariosPage } from './editar-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: EditarUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarUsuariosPageRoutingModule {}
