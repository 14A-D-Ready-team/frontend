import { Injectable } from "@angular/core";
import {
  CreateOrReplace,
  defaultEntityState,
  IdStrategy,
} from "@ngxs-labs/entity-state";
import { Action, State, StateContext } from "@ngxs/store";
import { PaginatedResponse } from "@shared/api";
import {
  ExtendedEntityState,
  ExtendedEntityStateModel,
} from "@shared/extended-entity-state";
import { map, switchMap } from "rxjs";
import { CreateBuffetDto, UpdateBuffetDto } from "../dto";
import { Buffet } from "../entity";
import { SearchBuffetsQuery } from "../query";
import { BuffetService } from "../service";
import * as Actions from "./buffet.actions";

export type BuffetStateModel = ExtendedEntityStateModel<Buffet>;

@State<BuffetStateModel>({
  name: "buffet",
  defaults: { ...defaultEntityState() },
})
@Injectable()
export class BuffetState extends ExtendedEntityState<
  Buffet,
  SearchBuffetsQuery,
  PaginatedResponse<Buffet>,
  CreateBuffetDto,
  UpdateBuffetDto
> {
  constructor(private buffetService: BuffetService) {
    super({
      storeClass: BuffetState,
      _idKey: "id",
      idStrategy: IdStrategy.EntityIdGenerator,
      service: buffetService,
      actions: Actions,
    });
  }

  @Action(Actions.LoadById)
  public loadById(ctx: StateContext<BuffetState>, action: Actions.LoadById) {
    return this.buffetService
      .findOne(action.id)
      .pipe(
        switchMap(buffet =>
          ctx.dispatch(new CreateOrReplace(BuffetState, buffet)),
        ),
      );
  }
}
