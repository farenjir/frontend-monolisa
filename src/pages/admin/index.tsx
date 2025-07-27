import type { RouteObject } from "react-router-dom";

import AdminLayout from "@/layout/adminLayout";

export const adminRoutes: RouteObject = {
	path: "/admin",
	element: <AdminLayout />,
	children: [
		{
			index: true,
			id: "adminDashboard",
			lazy: async () => ({ Component: (await import("./dashboard")).default }),
		},
		{
			path: "services",
			id: "adminServices",
			lazy: async () => ({ Component: (await import("./services")).default }),
		},
		{
			path: "schedule",
			id: "adminSchedule",
			lazy: async () => ({ Component: (await import("./schedule")).default }),
		},
	],
};
