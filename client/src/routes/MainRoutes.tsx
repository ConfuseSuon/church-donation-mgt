import { Suspense } from "react";
import Certificate from "../container/Certificate";
import Dashboard from "../container/Dashboard";
import Donation from "../container/Donation";
import AddDonation from "../container/Donation/AddDonation";
import EditDonation from "../container/Donation/EditDonation";
import Donor from "../container/Donor";
import AddDonor from "../container/Donor/AddDonor";
import EditDonor from "../container/Donor/EditDonor";
import Report from "../container/Report";
import AppLayout from "../layout";
import RolePermission from "../utils/RolePermission";
import ProtectedRoute from "./ProtectedRoutes";

const loggedInUserData = {
  role: "admin",
};

const MainRoutes = {
  path: "/",
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "/dashboard",
      element: (
        <Suspense fallback="Loading...">
          <RolePermission
            requiredRole={"admin"}
            loggedUserData={loggedInUserData}
          >
            <Dashboard />
          </RolePermission>
        </Suspense>
      ),
    },
    {
      path: "/dashboard/donor",
      element: (
        <Suspense fallback="Loading...">
          <Donor />
        </Suspense>
      ),
    },
    {
      path: "/dashboard/donor/add",
      element: (
        <Suspense fallback="Loading...">
          <AddDonor />
        </Suspense>
      ),
    },
    {
      path: "/dashboard/donor/edit/",
      element: (
        <Suspense fallback="Loading...">
          <EditDonor />
        </Suspense>
      ),
    },
    {
      path: "/dashboard/donation",
      element: (
        <Suspense fallback="Loading...">
          <Donation />
        </Suspense>
      ),
    },
    {
      path: "/dashboard/donation/add",
      element: (
        <Suspense fallback="Loading...">
          <AddDonation />
        </Suspense>
      ),
    },
    {
      path: "/dashboard/donation/edit",
      element: (
        <Suspense fallback="Loading...">
          <EditDonation />
        </Suspense>
      ),
    },

    {
      path: "/dashboard/certificate",
      element: (
        <Suspense fallback="Loading...">
          <Certificate />
        </Suspense>
      ),
    },
    {
      path: "/dashboard/report",
      element: (
        <Suspense fallback="Loading...">
          <Report />
        </Suspense>
      ),
    },
  ],
};

export default MainRoutes;
