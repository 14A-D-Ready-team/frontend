import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  EmailVerification,
  EmailVerificationStateModel,
  EmailVerificationStatus,
} from "./store";

@Component({
  selector: "app-send-email-verification-form",
  templateUrl: "./send-email-verification-form.component.html",
  styleUrls: ["./send-email-verification-form.component.scss"],
})
export class SendEmailVerificationFormComponent implements OnInit {
  public emailVerificationForm: FormGroup;

  @Select(
    (state: { emailVerification: EmailVerificationStateModel }) =>
      state.emailVerification.status,
  )
  public emailVerificationStatus!: Observable<EmailVerificationStatus>;
  constructor(private store: Store) {
    this.emailVerificationForm = new FormGroup({
      email: new FormControl(""),
    });
  }

  public EmailVerification() {
    this.store.dispatch(new EmailVerification());
  }

  ngOnInit() {}
}
