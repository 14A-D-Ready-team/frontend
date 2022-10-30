import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";

@State({ name: "auth" })
@Injectable()
export class AuthState {}
