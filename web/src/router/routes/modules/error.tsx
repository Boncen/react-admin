import { AppRouteObject } from "#/router";
import { CircleLoading } from "@/components/loading";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const Page403 = lazy(() => import(`@/pages/error/page403`));
const Page404 = lazy(() => import(`@/pages/error/page404`));
const Page500 = lazy(() => import(`@/pages/error/page500`));

const ErrorRoute: AppRouteObject = {
  order: 10,
  path: "error",
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "",
    key: "/error",
    isPublic: true
  },
  children: [
    {
      path: "403",
      element: <Page403 /> ,
    },
    {
      path: "404",
      element: (
          <Page404 />
      ),
    },
    {
      path: "500",
      element: (
          <Page500 />
      ),
    },
  ],
};

export default ErrorRoute;
