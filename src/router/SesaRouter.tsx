import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { Routes as SesaRoutes } from "./Routes";
import { ErrorPage } from "../pages/error/Error";

export const SesaRouter = () => {
  return (
    <BrowserRouter basename="/sesayonetim">
      <Routes>
        <Route element={<PageLayout />}>
          {SesaRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
