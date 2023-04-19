import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { IonModal, ViewWillLeave } from "@ionic/angular";
import { Select } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { User } from "@shared/user";
import { Observable, Subscription, filter } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"],
})
export class WelcomePage implements OnDestroy, AfterViewInit {
  @ViewChild("loginModal") modal!: IonModal;

  constructor(private route: ActivatedRoute, public router: Router) {}

  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  public get activeSegment() {
    if (/^\/login.*/.test(this.router.url)) {
      return "login";
    }
    if (/^\/signup.*/.test(this.router.url)) {
      return "signup";
    }
    return "";
  }

  private subscription?: Subscription;

  segmentChanged(event: any) {
    this.router.navigate([event.target.value]);
  }

  ngAfterViewInit(): void {
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.modal.isOpen = /^\/(login|signup).*/.test(url);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
