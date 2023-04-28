import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { CartState } from "./data-access";

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([CartState])],
})
export class CartModule {}
