import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout.tsx";
import { Producers } from "./pages/Producers/index.tsx";
import { Farms } from "./pages/Farms/index.tsx";
import { Dashboard } from "./pages/Dashboard/index.tsx";
import { ProducerPage } from "./pages/Producers/producerPage.tsx";

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
        ],
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
