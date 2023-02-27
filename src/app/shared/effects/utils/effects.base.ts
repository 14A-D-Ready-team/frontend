import { Observable, Subscription } from "rxjs";
import { getEffects } from "./effect.decorator";

export class EffectsBase {
  private subscriptions: Subscription[] = [];

  private get effects(): Observable<unknown>[] {
    return getEffects(this);
  }

  public start() {
    this.subscriptions = this.effects.map(effect => effect.subscribe());
  }

  public terminate() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
