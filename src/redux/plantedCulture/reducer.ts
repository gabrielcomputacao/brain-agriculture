import type { ActionRedux, CulturasPlantadas } from "../../types/types";
import { PlantedCultureActionTypes } from "./actionsTypes";

const initialState: CulturasPlantadas[] = [];

export const plantedCultureReducer = (
  state = initialState,
  action: ActionRedux
) => {
  switch (action.type) {
    case PlantedCultureActionTypes.POST:
      return [...state, ...action.payload];
    case PlantedCultureActionTypes.ADD:
      return [...state, action.payload];
    case PlantedCultureActionTypes.DELETE:
      return state.filter((producer) => producer.id !== action.payload);
    default:
      return state;
  }
};
