import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoriesListPageRoutingModule } from "./categories-list-routing.module";

import { CategoriesListPage } from "./categories-list.page";
import { CategoryDisplayComponent } from "../../ui/category-display";
import { NgxsModule } from "@ngxs/store";
import { CategoriesListState } from "./store";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { CategoryDisplaySkeletonComponent } from "../../ui/category-display-skeleton";
import { ExtendedFormPluginModule } from "@app/shared/extended-form-plugin";

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
  ],
  declarations: [CategoriesListPage],
})
export class CategoriesListPageModule {}
