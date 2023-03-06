import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuffetListPage } from "./buffet-list.page";

const routes: Routes = [
  {
    path: "",
    component: BuffetListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuffetListRoutingModule {}
