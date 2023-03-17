import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/buffet-list").then(m => m.BuffetListModule),
  },
  {
    path: "edit",
    loadChildren: () =>
      import("./feature/buffet-editor").then(m => m.BuffetEditorModule),
  },
  {
    path: "new",
    loadChildren: () =>
      import("./feature/new-buffet").then(m => m.NewBuffetModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuffetsRoutingModule {}
