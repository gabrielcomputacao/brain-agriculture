import type { ActionRedux, Produtor } from "../../types/types";
import { ProducersActionTypes } from "./actionsTypes";

const initialState: Produtor[] = [];

export const producersReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case ProducersActionTypes.GET:
      return [...initialState, ...action.payload];
    case ProducersActionTypes.DELETE:
      return state.filter((producer) => producer.id !== action.payload);
    default:
      return state;
  }
};
