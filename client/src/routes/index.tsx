import { useRoutes } from "react-router-dom";
import PageNotFound from "../component/PageNotFound";
import MainRoutes from "./MainRoutes";
import { MiniRoutes } from "./MiniRoutes";

export default function Routing(props: any): React.ReactElement | null {
  const routes = [MainRoutes, MiniRoutes];
  routes.push({
    path: "*",
    element: <PageNotFound />,
  });
  return useRoutes(routes);
}
