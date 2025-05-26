import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/index.tsx";
import { Layout } from "./Layout.tsx";
import { lazy, Suspense } from "react";
import { SuspenseContainer } from "./components/suspenseContainer/index.tsx";

const Producers = lazy(() => import("./pages/Producers/index.tsx"));
const Farms = lazy(() => import("./pages/Farms/index.tsx"));
const ProducerPage = lazy(() => import("./pages/Producers/producerPage.tsx"));
const Harvest = lazy(() => import("./pages/Harvest/index.tsx"));
const PlantedCulture = lazy(() => import("./pages/PlantedCulture/index.tsx"));

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
        element: (
          <Suspense fallback={<SuspenseContainer />}>
            <Farms />
          </Suspense>
        ),
      },
      {
        path: "producers",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SuspenseContainer />}>
                <Producers />,
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<SuspenseContainer />}>
                <ProducerPage />,
              </Suspense>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <Suspense fallback={<SuspenseContainer />}>
                <ProducerPage />,
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "harvest",
        element: (
          <Suspense fallback={<SuspenseContainer />}>
            <Harvest />,
          </Suspense>
        ),
      },
      {
        path: "planted-culture",
        element: (
          <Suspense fallback={<SuspenseContainer />}>
            <PlantedCulture />,
          </Suspense>
        ),
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
