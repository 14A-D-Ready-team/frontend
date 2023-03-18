import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import {
  BuffetState,
  Buffet,
  BuffetService,
  CreateInviteTokenDto,
} from "@shared/buffet";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-create-invite-token",
  templateUrl: "./create-invite-token.page.html",
  styleUrls: ["./create-invite-token.page.scss"],
})
export class CreateInviteTokenPage implements OnInit, OnDestroy {
  public code!: string;

  private subscription!: Subscription;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  private activeId!: number;

  constructor(private buffetService: BuffetService) {}

  ngOnInit() {}

  generate() {
    const dto = new CreateInviteTokenDto();
    this.activeBuffet$.forEach(buffet => (this.activeId = buffet.id));
    dto.buffetId = this.activeId;
    this.subscription = this.buffetService.createInvite(dto).subscribe({
      next: result => {
        this.code = result.id;
        console.log(result.id);
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
