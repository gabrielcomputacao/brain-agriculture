import type { ActionRedux, CulturasPlantadas } from "../../types/types";
import { PlantedCultureActionTypes } from "./actionsTypes";

const initialState: CulturasPlantadas[] = [];

export const plantedCultureReducer = (
  state = initialState,
  action: ActionRedux
) => {
  switch (action.type) {
    case PlantedCultureActionTypes.GET:
      return [...initialState, ...action.payload];
    default:
      return state;
  }
};
