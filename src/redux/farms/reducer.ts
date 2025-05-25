import type { ActionRedux, Propriedade } from "../../types/types";
import { FarmsActionTypes } from "./actionsTypes";

const initialState: Propriedade[] = [];

export const farmsReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case FarmsActionTypes.ADD:
      return [...initialState, action.payload];
    case FarmsActionTypes.GET:
      return [...initialState, ...action.payload];

    default:
      return state;
  }
};
