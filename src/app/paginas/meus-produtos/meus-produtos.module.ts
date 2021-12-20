import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusProdutosPageRoutingModule } from './meus-produtos-routing.module';

import { MeusProdutosPage } from './meus-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusProdutosPageRoutingModule
  ],
  declarations: [MeusProdutosPage]
})
export class MeusProdutosPageModule {}
