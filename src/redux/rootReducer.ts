import { combineReducers } from "redux";
import { producersReducer } from "./producers/reducer";
import { farmsReducer } from "./farms/reducer";
import { plantedCultureReducer } from "./plantedCulture/reducer";

export const rootReducer = combineReducers({
  producersReducer,
  farmsReducer,
  plantedCultureReducer,
});
