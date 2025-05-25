import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout.tsx";
import { Producers } from "./pages/Producers/index.tsx";
import { Farms } from "./pages/Farms/index.tsx";
import { Dashboard } from "./pages/Dashboard/index.tsx";
import { ProducerPage } from "./pages/Producers/producerPage.tsx";
import { Harvest } from "./pages/Harvest/index.tsx";
import { PlantedCulture } from "./pages/PlantedCulture/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "farms",
        element: <Farms />,
      },
      {
        path: "producers",
        children: [
          {
            index: true,
            element: <Producers />,
          },
          {
            path: "add",
            element: <ProducerPage />,
          },
          {
            path: "edit/:id",
            element: <ProducerPage />,
          },
        ],
      },
      {
        path: "harvest",
        element: <Harvest />,
      },
      {
        path: "planted-culture",
        element: <PlantedCulture />,
      },
    ],
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
