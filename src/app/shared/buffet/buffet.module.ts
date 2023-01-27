import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { BuffetService, BuffetState } from "./data-access";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([BuffetState]),
  ],
  providers: [BuffetService],
})
export class BuffetModule {}
