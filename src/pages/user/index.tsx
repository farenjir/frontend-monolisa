import type { RouteObject } from "react-router-dom";

import UserLayout from "@/layout/userLayout";
import { ROUTES_PATH } from "@/constants/routes";
const { USER } = ROUTES_PATH;

export const userRoutes: RouteObject = {
  path: "/user",
  element: <UserLayout />,
  children: [
    {
      index: true,
      id: `user-${USER.DASHBOARD}`,
      lazy: async () => ({ Component: (await import("./dashboard")).default }),
    },
  ],
};
