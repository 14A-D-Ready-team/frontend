import { Select, Store } from "@ngxs/store";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthState, Logout } from "@shared/authentication";
import { User } from "@shared/user";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store,
    private toastController: ToastController,
  ) {}
  currentPage = this.router.url;

  @Select(AuthState.user)
  public activeUser$!: Observable<User | undefined>;

  public logout() {
    this.store.dispatch(new Logout());
  }

  public async showUnavailableFunctionToast() {
    const toast = await this.toastController.create({
      duration: 4000,
      position: "top",
      color: "warning",
      header: "Ez a funkció jelenleg nem elérhető!",
      icon: "warning",
      buttons: [{ icon: "close", role: "cancel" }],
    });

    toast.present();
  }

  ngOnInit() {
    //console.log(this.currentPage);
  }
}
