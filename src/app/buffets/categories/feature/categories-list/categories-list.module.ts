import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoriesListPageRoutingModule } from "./categories-list-routing.module";

import { CategoriesListPage } from "./categories-list.page";
import { NgxsModule } from "@ngxs/store";
import { CategoriesListState } from "./store";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ExtendedFormPluginModule } from "@app/shared/extended-form-plugin";
import { ActionInProgressPipe } from "../../utils";
import {
  CategoryDisplayComponent,
  CategoryDisplaySkeletonComponent,
} from "../../ui";
import { IonicErrorCardComponent } from "@shared/exceptions";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsModule.forFeature([CategoriesListState]),
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    CategoriesListPageRoutingModule,
    CategoryDisplayComponent,
    CategoryDisplaySkeletonComponent,
    IonicErrorCardComponent,
    ActionInProgressPipe,
  ],
  declarations: [CategoriesListPage],
})
export class CategoriesListPageModule {}
