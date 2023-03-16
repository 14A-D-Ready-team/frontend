import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IonModal } from "@ionic/angular";
import { Select } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { User } from "@shared/user";
import { Observable } from "rxjs";

@Component({
  selector: "app-main-desktop",
  templateUrl: "./main-desktop.page.html",
  styleUrls: ["./main-desktop.page.scss"],
})
export class MainDesktopPage implements OnInit, OnDestroy {
  @ViewChild("loginModal") modal!: IonModal;

  selectedSegment = "login";

  constructor(private route: ActivatedRoute) {}

  cancel() {
    this.modal.dismiss(null, "cancel");
  }

  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }

  ngOnInit() {
    this.selectedSegment = "login";
  }

  ngOnDestroy() {
    this.modal.dismiss();
  }
}
