import { DeepReadonly } from "@ngxs-labs/entity-state";
import { State } from "@ngxs/store";

export interface BuffetSelectStateModel {
  buffetIds: number[];
  remainingItems?: number;
}

export const buffetsLoadPerScroll = 8;
