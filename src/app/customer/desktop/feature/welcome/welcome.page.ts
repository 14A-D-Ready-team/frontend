import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonModal } from "@ionic/angular";
import { Select } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { User } from "@shared/user";
import { Observable } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"],
})
export class WelcomePage implements OnInit, OnDestroy {
  @ViewChild("loginModal") modal!: IonModal;

  selectedSegmentLogin = "login";

  constructor(private route: ActivatedRoute) {}

  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  segmentChanged(event: any) {
    this.selectedSegmentLogin = event.target.value;
  }

  cancel() {
    this.modal.dismiss(null, "cancel");
  }

  ngOnInit() {
    this.selectedSegmentLogin = "login";
  }
  ngOnDestroy() {
    this.modal.dismiss(null, "cancel");
    console.log("bezárt");
  }

  ionViewDidLeave() {
    this.modal.dismiss();
    console.log("bezárt");
  }
}
