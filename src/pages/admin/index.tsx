import type { RouteObject } from "react-router-dom";

import AdminLayout from "@/layout/adminLayout";
import { ROUTES_PATH } from "@/constants/routes";
const { ADMIN } = ROUTES_PATH;

export const adminRoutes: RouteObject = {
	path: "/admin",
	element: <AdminLayout />,
	children: [
		{
			index: true,
			id: `admin-${ADMIN.DASHBOARD}`,
			path: ADMIN.DASHBOARD,
			lazy: async () => ({ Component: (await import("./dashboard")).default }),
		},
		{
			path: ADMIN.SERVICES,
			id: `admin-${ADMIN.SERVICES}`,
			lazy: async () => ({ Component: (await import("./services")).default }),
		},
		{
			path: ADMIN.SCHEDULE,
			id: `admin-${ADMIN.SCHEDULE}`,
			lazy: async () => ({ Component: (await import("./schedule")).default }),
		},
		{
			path: ADMIN.CATEGORIES,
			id: `admin-${ADMIN.CATEGORIES}`,
			lazy: async () => ({ Component: (await import("./services copy")).default }),
		},
		{
			path: ADMIN.PERSONNEL,
			id: `admin-${ADMIN.PERSONNEL}`,
			lazy: async () => ({ Component: (await import("./services copy 2")).default }),
		},
	],
};
