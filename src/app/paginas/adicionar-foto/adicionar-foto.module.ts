import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarFotoPageRoutingModule } from './adicionar-foto-routing.module';

import { AdicionarFotoPage } from './adicionar-foto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarFotoPageRoutingModule
  ],
  declarations: [AdicionarFotoPage]
})
export class AdicionarFotoPageModule {}
