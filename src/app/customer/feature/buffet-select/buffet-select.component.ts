import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  InfiniteScrollCustomEvent,
  IonicModule,
  RefresherCustomEvent,
} from "@ionic/angular";
import { SetActive } from "@ngxs-labs/entity-state";
import { NgxsModule, Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Observable, take } from "rxjs";
import {
  BuffetSelectState,
  LoadMore,
  LoadPage,
  Reload,
  RetryLoading,
} from "./store";

@Component({
  selector: "app-buffet-select-component",
  templateUrl: "./buffet-select.component.html",
  styleUrls: ["./buffet-select.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class BuffetSelectComponent implements OnInit {
  constructor(private store: Store) {}
  @Select(BuffetSelectState.shownBuffets)
  public buffets$!: Observable<Buffet[]>;

  @Select(BuffetState.loading)
  public loading$!: Observable<boolean>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  public retryLoading() {
    this.store.dispatch(new RetryLoading());
  }

  public handleRefresh(event: any) {
    const refresherEvent = event as RefresherCustomEvent;
    return this.store
      .dispatch(new Reload())
      .pipe(take(1))
      .subscribe(() => refresherEvent.detail.complete());
  }

  public onIonInfinite(event: any) {
    this.store
      .dispatch(new LoadMore())
      .pipe(take(1))
      .subscribe(() => (event as InfiniteScrollCustomEvent).target.complete());
  }

  public buffetById(index: number, el: Buffet): number {
    return el.id;
  }

  public select(id: number) {
    const idString = id.toString();
    this.store.dispatch(new SetActive(BuffetState, idString));
    console.log(id);
  }

  ngOnInit() {
    this.store.dispatch(new LoadPage());
  }
}
