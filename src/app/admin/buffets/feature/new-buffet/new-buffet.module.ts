import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ExtendedFormPluginModule } from '@shared/extended-form-plugin';
import { ErrorListComponent } from '@shared/inputs/feature/ionic';
import { NewBuffetPage } from './new-buffet.page';
import { NewBuffetRoutingModule } from './new-buffet-routing.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    NewBuffetRoutingModule,
    ErrorListComponent
  ],
  declarations: [NewBuffetPage]
})
export class NewBuffetModule { }