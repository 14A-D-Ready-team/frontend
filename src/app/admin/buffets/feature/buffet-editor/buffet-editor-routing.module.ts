import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuffetEditorPage } from './buffet-editor.page';

const routes: Routes = [
  {
    path: '',
    component: BuffetEditorPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuffetEditorRoutingModule { }
