import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainDesktopPageRoutingModule } from './main-desktop-routing.module';

import { MainDesktopPage } from './main-desktop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainDesktopPageRoutingModule
  ],
  declarations: [MainDesktopPage]
})
export class MainDesktopPageModule {}
