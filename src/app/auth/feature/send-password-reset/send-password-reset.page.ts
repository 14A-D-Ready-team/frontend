import {
  SendPasswordReset,
  SendPasswordResetStateModel,
  SendPasswordResetStatus,
} from "./store";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
@Component({
  selector: "app-send-password-reset",
  templateUrl: "./send-password-reset.page.html",
  styleUrls: ["./send-password-reset.page.scss"],
})
export class SendPasswordResetPage implements OnInit {
  public sendPasswordResetForm: FormGroup;

  @Select(
    (state: { sendPasswordReset: SendPasswordResetStateModel }) =>
      state.sendPasswordReset.status,
  )
  public sendPasswordResetStatus!: Observable<SendPasswordResetStatus>;

  constructor(private store: Store) {
    this.sendPasswordResetForm = new FormGroup({
      email: new FormControl(""),
    });
  }

  public SendPasswordReset() {
    this.store.dispatch(new SendPasswordReset());
  }

  ngOnInit() {}
}
