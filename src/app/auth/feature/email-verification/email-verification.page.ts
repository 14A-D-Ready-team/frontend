import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngxs/store";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";

interface VerificationForm {
  email: FormControl<string | null>;
}

@Component({
  selector: "app-email-verification",
  templateUrl: "./email-verification.page.html",
  styleUrls: ["./email-verification.page.scss"],
})
export class EmailVerificationPage implements OnInit {
  public verificationForm: FormGroup<VerificationForm>;

  constructor(private store: Store) {
    this.verificationForm = new FormGroup<VerificationForm>({
      email: new FormControl(""),
    });
  }

  ngOnInit() {}
}
