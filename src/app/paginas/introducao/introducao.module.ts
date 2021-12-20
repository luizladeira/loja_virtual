import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroducaoPageRoutingModule } from './introducao-routing.module';

import { IntroducaoPage } from './introducao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroducaoPageRoutingModule
  ],
  declarations: [IntroducaoPage]
})
export class IntroducaoPageModule {}
