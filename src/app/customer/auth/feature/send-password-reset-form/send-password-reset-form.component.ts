import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  SendPasswordReset,
  SendPasswordResetStateModel,
  SendPasswordResetStatus,
} from "./store";

@Component({
  selector: "app-send-password-reset-form",
  templateUrl: "./send-password-reset-form.component.html",
  styleUrls: ["./send-password-reset-form.component.scss"],
})
export class SendPasswordResetFormComponent implements OnInit {
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
