import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuffetEditorRoutingModule } from './buffet-editor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ExtendedFormPluginModule } from '@shared/extended-form-plugin';
import { ErrorListComponent } from '@shared/inputs/feature/ionic';
import { BuffetEditorPage } from './buffet-editor.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    BuffetEditorRoutingModule,
    ErrorListComponent
  ],
  declarations: [BuffetEditorPage]
})
export class BuffetEditorModule { }