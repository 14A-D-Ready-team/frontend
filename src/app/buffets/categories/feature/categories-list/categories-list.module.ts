import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoriesListPageRoutingModule } from "./categories-list-routing.module";

import { CategoriesListPage } from "./categories-list.page";
import { CategoryDisplayComponent } from "../../ui/category-display";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesListPageRoutingModule,
    CategoryDisplayComponent,
  ],
  declarations: [CategoriesListPage],
})
export class CategoriesListPageModule {}
