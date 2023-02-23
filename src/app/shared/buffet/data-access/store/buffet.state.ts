import { Injectable } from "@angular/core";
import {
  defaultEntityState,
  IdStrategy,
} from "@ngxs-labs/entity-state";
import { State } from "@ngxs/store";
import { PaginatedResponse } from "@shared/api";
import {
  ExtendedEntityState,
  ExtendedEntityStateModel,
} from "@shared/extended-entity-state";
import { CreateBuffetDto, UpdateBuffetDto } from "../dto";
import { Buffet } from "../entity";
import { SearchBuffetsQuery } from "../query";
import { BuffetService } from "../service";
import * as Actions from './buffet.actions';

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
}
