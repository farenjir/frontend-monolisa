import type { RouteObject } from "react-router-dom";

import MainLayout from "@/layout/mainLayout";
import { ROUTES_PATH } from "@/constants/routes";
const { MAIN } = ROUTES_PATH;

export const mainRoutes: RouteObject = {
	path: "/",
	element: <MainLayout />,
	children: [
		{
			index: true,
			id: MAIN.HOME,
			lazy: async () => ({ Component: (await import("./home")).default }),
		},
	],
};
