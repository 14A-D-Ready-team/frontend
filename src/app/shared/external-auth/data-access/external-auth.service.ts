import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, switchMap } from "rxjs";

@Injectable()
export class ExternalAuthService {
  private loginDisabledConditions = new BehaviorSubject(of(false));

  public get loginDisabled$() {
    return this.loginDisabledConditions.pipe(switchMap(condition => condition));
  }

  public set loginDisabled$(condition: Observable<boolean>) {
    this.loginDisabledConditions.next(condition);
  }
  
}
