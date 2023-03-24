import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MainPageRoutingModule } from "./main-routing.module";

import { MainPage } from "./main.page";
import { NgxsModule } from "@ngxs/store";
import { CategoryState } from "@shared/category";
import { ErrorMessagePipe, ExceptionsModule } from "@shared/exceptions";
import { MainPageState } from "./store";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    NgxsModule.forFeature([MainPageState]),
    ErrorMessagePipe,
    ExceptionsModule.forFeature({}),
  ],
  declarations: [MainPage],
})
export class MainPageModule {}
