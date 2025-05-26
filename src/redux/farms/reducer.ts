import type { ActionRedux, Propriedade } from "../../types/types";
import { FarmsActionTypes } from "./actionsTypes";

const initialState: Propriedade[] = [];

export const farmsReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case FarmsActionTypes.ADD:
      return [...state, action.payload];
    case FarmsActionTypes.POST:
      return [...state, ...action.payload];
    case FarmsActionTypes.DELETE:
      return state.filter((producer) => producer.id !== action.payload);

    default:
      return state;
  }
};
