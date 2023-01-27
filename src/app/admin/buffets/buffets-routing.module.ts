import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/buffet-list").then(m => m.BuffetsListModule),
  },
  {
    path: "edit",
    loadChildren: () =>
      import("./feature/buffet-editor").then(m => m.BuffetEditorPage),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuffetsRoutingModule { }
