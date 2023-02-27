import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import { Observable } from "rxjs";
import { AuthState, SessionSignin } from "@shared/authentication";

@Component({
  selector: "app-auth-shell",
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
export class AuthShellComponent implements OnInit {
  @Select(AuthState.sessionSigninStatus)
  public status$!: Observable<ApiRequestStatus>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new SessionSignin());
  }
}
