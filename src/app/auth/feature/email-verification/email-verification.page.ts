import {
  EmailVerification,
  EmailVerificationStateModel,
  EmailVerificationStatus,
} from "./store";
import { FormControl, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import {} from "./store";

@Component({
  selector: "app-email-verification",
  templateUrl: "./email-verification.page.html",
  styleUrls: ["./email-verification.page.scss"],
})
export class EmailVerificationPage implements OnInit {
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
