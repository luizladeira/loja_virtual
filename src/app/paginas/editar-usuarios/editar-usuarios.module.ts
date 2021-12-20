import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarUsuariosPageRoutingModule } from './editar-usuarios-routing.module';

import { EditarUsuariosPage } from './editar-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditarUsuariosPageRoutingModule
  ],
  declarations: [EditarUsuariosPage]
})
export class EditarUsuariosPageModule {}
