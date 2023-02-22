import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuffetSelectPageRoutingModule } from './buffet-select-routing.module';

import { BuffetSelectPage } from './buffet-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuffetSelectPageRoutingModule
  ],
  declarations: [BuffetSelectPage]
})
export class BuffetSelectPageModule {}
