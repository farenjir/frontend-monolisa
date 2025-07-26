import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

import ContextApi from "@/context/ContextApi";

import i18n from "@/langs/i18n";

import { mainRoutes } from "@/pages/main";
import { userRoutes } from "@/pages/user";
import { adminRoutes } from "@/pages/admin";

import "@/assets/styles/global.css"

const router = createBrowserRouter([mainRoutes, userRoutes, adminRoutes]);

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ContextApi>
        <RouterProvider router={router} />
      </ContextApi>
    </I18nextProvider>
  );
}
