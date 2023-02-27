import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { AuthState, SessionSignin } from "@app/auth/data-access";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth-shell",
  template: `
    <div class="overlay" *ngIf="status$ | async as status">
      <ion-spinner
        *ngIf="status.loading"
        name="crescent"
        color="primary"
      ></ion-spinner>
      <h1 *ngIf="status.error">{{ status.error | errorMessage }}</h1>
    </div>
    <ion-router-outlet></ion-router-outlet>
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
export class AuthShellComponent implements OnInit {
  @Select(AuthState.sessionSigninStatus)
  public status$!: Observable<ApiRequestStatus>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new SessionSignin());
  }
}
