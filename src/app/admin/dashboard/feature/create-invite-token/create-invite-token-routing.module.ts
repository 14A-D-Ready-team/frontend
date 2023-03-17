import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInviteTokenPage } from './create-invite-token.page';

const routes: Routes = [
  {
    path: '',
    component: CreateInviteTokenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateInviteTokenRoutingModule { }
