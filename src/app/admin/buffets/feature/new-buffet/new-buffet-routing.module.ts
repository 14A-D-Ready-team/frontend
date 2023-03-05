import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewBuffetPage } from "./new-buffet.page";

const routes: Routes = [
  {
    path: "",
    component: NewBuffetPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBuffetRoutingModule {}
