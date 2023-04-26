import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileMobilePageRoutingModule } from './profile-mobile-routing.module';

import { ProfileMobilePage } from './profile-mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMobilePageRoutingModule
  ],
  declarations: [ProfileMobilePage]
})
export class ProfileMobilePageModule {}
