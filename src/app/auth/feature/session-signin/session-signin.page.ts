import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofActionDispatched, Store } from "@ngxs/store";
import { SessionSigninCompleted } from "@shared/authentication";
import { Subscription, take } from "rxjs";

@Component({
  selector: "app-session-signin",
  template: `
    <div class="overlay">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
    </div>
  `,
  styles: [
    `
      .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: var(--ion-color-dark);
      }

      ion-spinner {
        display: block;
        height: 30%;
        width: 30%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionSigninPage implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private actions: Actions,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  public ngOnInit() {
    this.subscription = this.actions
      .pipe(ofActionDispatched(SessionSigninCompleted), take(1))
      .subscribe({
        next: (action: SessionSigninCompleted) => {
          this.ngZone.run(() =>
            this.router.navigate(["/auth/login?nextUrl=asd"], {
              replaceUrl: true,
            }),
          );
        },
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
