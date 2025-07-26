import type { RouteObject } from "react-router-dom";

import MainLayout from "@/layout/mainLayout";


export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
      id: "home",
      lazy: async () => ({ Component: (await import("./home")).default }),
    },
    // {
    //   path: "app",
    //   id: "app",
    //   lazy: async () => ({ Component: (await import("../pages/main/app")).default }),
    // },
  ],
};
