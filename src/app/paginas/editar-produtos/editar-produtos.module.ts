import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarProdutosPageRoutingModule } from './editar-produtos-routing.module';

import { EditarProdutosPage } from './editar-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditarProdutosPageRoutingModule
  ],
  declarations: [EditarProdutosPage]
})
export class EditarProdutosPageModule {}
