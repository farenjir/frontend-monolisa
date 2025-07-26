import type { RouteObject } from "react-router-dom";

import UserLayout from "@/layout/userLayout";

export const userRoutes: RouteObject = {
  path: "/user",
  element: <UserLayout />,
  children: [
    {
      index: true,
      id: "userDashboard",
      lazy: async () => ({ Component: (await import("./dashboard")).default }),
    },
  ],
};
