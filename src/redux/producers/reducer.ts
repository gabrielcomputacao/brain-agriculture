import type { ActionRedux, Produtor } from "../../types/types";
import { ProducersActionTypes } from "./actionsTypes";

const initialState: Produtor[] = [];

export const producersReducer = (state = initialState, action: ActionRedux) => {
  switch (action.type) {
    case ProducersActionTypes.POST:
      return [...state, ...action.payload];
    case ProducersActionTypes.ADD:
      return [...state, action.payload];
    case ProducersActionTypes.DELETE:
      return state.filter((producer) => producer.id !== action.payload);
    case ProducersActionTypes.PATCH:
      return state.map((producer) =>
        producer.id === action.payload.id
          ? { ...producer, ...action.payload }
          : producer
      );
    default:
      return state;
  }
};
