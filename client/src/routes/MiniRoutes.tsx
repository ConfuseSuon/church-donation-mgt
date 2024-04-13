import { Suspense } from "react";
import Login from "../container/Login";

export const MiniRoutes = {
  path: "/login",
  element: (
    <Suspense fallback={"Loading..."}>
      <Login />
    </Suspense>
  ),
};
