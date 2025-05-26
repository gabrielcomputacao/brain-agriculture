import type { store } from "../redux/store";

export async function getPlantedCulture(
  dispatch: typeof store.dispatch,
  type: string
) {
  try {
    const response = await fetch("http://localhost:3000/cultura");
    const dataObject = await response.json();

    dispatch({
      type: type,
      payload: dataObject,
    });
  } catch (error) {}
}
