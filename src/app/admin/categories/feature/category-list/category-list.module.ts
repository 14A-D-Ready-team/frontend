import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoryListPageRoutingModule } from "./category-list-routing.module";

import { CategoryListPage } from "./category-list.page";
import { NgxsModule } from "@ngxs/store";
import { CategoryListState } from "./store";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ExtendedFormPluginModule } from "@app/shared/extended-form-plugin";
import { ActionInProgressPipe } from "../../utils";
import {
  CategoryDisplayComponent,
  CategoryDisplaySkeletonComponent,
} from "../../ui";
import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";
import { AdminHeaderComponent } from "@app/admin/shell";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsModule.forFeature([CategoryListState]),
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    CategoryListPageRoutingModule,
    CategoryDisplayComponent,
    CategoryDisplaySkeletonComponent,
    ErrorCardComponent,
    ActionInProgressPipe,
    AdminHeaderComponent,
  ],
  declarations: [CategoryListPage],
})
export class CategoryListPageModule {}
