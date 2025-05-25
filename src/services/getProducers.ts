import type { store } from "../redux/store";

export async function getProducers(
  dispatch: typeof store.dispatch,
  type: string
) {
  try {
    const response = await fetch("http://localhost:3000/producers");
    const dataObject = await response.json();

    dispatch({
      type: type,
      payload: dataObject,
    });
  } catch (error) {}
}
