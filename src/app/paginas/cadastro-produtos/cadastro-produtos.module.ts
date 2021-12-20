import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroProdutosPageRoutingModule } from './cadastro-produtos-routing.module';


import { CadastroProdutosPage } from './cadastro-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CadastroProdutosPageRoutingModule
  ],
  declarations: [CadastroProdutosPage]
})
export class CadastroProdutosPageModule {}
