import { Component, OnInit, ViewChild } from "@angular/core";
import {
  // InfiniteScrollCustomEvent,
  // IonLabel,
  IonModal,
  // RefresherCustomEvent,
} from "@ionic/angular";
import { SetActive } from "@ngxs-labs/entity-state";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Observable } from "rxjs";
// import {
//   BuffetSelectState,
//   LoadMore,
//   LoadPage,
//   Reload,
//   RetryLoading,
// } from "./store";

@Component({
  selector: "app-buffet-select",
  templateUrl: "./buffet-select.page.html",
  styleUrls: ["./buffet-select.page.scss"],
})
export class BuffetSelectPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  name!: string;

  /*   @Select(BuffetSelectState.shownBuffets)
  public buffets$!: Observable<Buffet[]>; */

  @Select(BuffetState.loading)
  public loading$!: Observable<boolean>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  cancel() {
    this.modal.dismiss(null, "cancel");
  }

  confirm() {
    // const idString = s.toString();
    // this.store.dispatch(new SetActive(BuffetState, idString));
    this.modal.dismiss(this.name, "confirm");
    console.log();
  }

  // public retryLoading() {
  //   this.store.dispatch(new RetryLoading());
  // }

  // public handleRefresh(event: any) {
  //   const refresherEvent = event as RefresherCustomEvent;
  //   return this.store
  //     .dispatch(new Reload())
  //     .pipe(take(1))
  //     .subscribe(() => refresherEvent.detail.complete());
  // }

  // public onIonInfinite(event: any) {
  //   this.store
  //     .dispatch(new LoadMore())
  //     .pipe(take(1))
  //     .subscribe(() => (event as InfiniteScrollCustomEvent).target.complete());
  // }

  // public buffetById(index: number, el: Buffet): number {
  //   return el.id;
  // }

  // public select(id: number) {
  //   const idString = id.toString();
  //   this.store.dispatch(new SetActive(BuffetState, idString));
  // }

  constructor(private store: Store) {}

  ngOnInit() {
    // this.store.dispatch(new LoadPage());
  }
}
