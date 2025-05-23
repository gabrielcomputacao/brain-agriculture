import { combineReducers } from "redux";
import { producersReducer } from "./producers/reducer";

export const rootReducer = combineReducers({
  producersReducer,
});
