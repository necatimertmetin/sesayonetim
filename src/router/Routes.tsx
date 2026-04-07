import { ErrorPage } from "../pages/error/Error";
import { Landing } from "../pages/Landing/Landing";
import { About } from "../pages/About/About";
import { ServicesPage } from "../pages/Services/ServicesPage";
import { Contact } from "../pages/Contact/Contact";
import type { JSX } from "react";

export type AppRoute = {
  path: string;
  element: JSX.Element;
  label: string;
  visibleOnHeader: boolean;
  visibleOnFooter: boolean;
};

export const Routes: AppRoute[] = [
  {
    path: "/",
    element: <Landing />,
    label: "navigation.homepage",
    visibleOnHeader: true,
    visibleOnFooter: true,
  },
  {
    path: "about",
    element: <About />,
    label: "navigation.about",
    visibleOnHeader: true,
    visibleOnFooter: true,
  },
  {
    path: "services",
    element: <ServicesPage />,
    label: "navigation.services",
    visibleOnHeader: true,
    visibleOnFooter: true,
  },
  {
    path: "contact",
    element: <Contact />,
    label: "navigation.contact",
    visibleOnHeader: true,
    visibleOnFooter: true,
  },
  {
    path: "error",
    element: <ErrorPage />,
    label: "error",
    visibleOnHeader: false,
    visibleOnFooter: false,
  },
];
