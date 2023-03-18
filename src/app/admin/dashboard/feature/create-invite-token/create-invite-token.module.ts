import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateInviteTokenRoutingModule } from "./create-invite-token-routing.module";
import { IonicModule } from "@ionic/angular";
import { CreateInviteTokenPage } from "./create-invite-token.page";
import { AdminHeaderComponent } from "@app/admin/shell";

@NgModule({
  declarations: [CreateInviteTokenPage],
  imports: [
    CommonModule,
    CreateInviteTokenRoutingModule,
    IonicModule,
    AdminHeaderComponent,
  ],
})
export class CreateInviteTokenModule {}
