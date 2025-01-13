import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./page/Login";
import Kasir from "./Kasir/dashboardKsr";
import NavbarKsr from "./Kasir/navKsr";
import NavbarOwn from "./Owner/navOwn";
import DashboardOwn from "./Owner/dashboardOwn";
import ProfilePage from "./page/Profile";

export const router = createBrowserRouter([
  // Login Page
  {
    path: "/",
    element: <Login />, // Halaman Login
  },

  // Kasir Section
  {
    path: "/kasir", // Route untuk Kasir
    element: (
      <NavbarKsr>
        <Outlet /> {/* Outlet untuk nested routes */}
      </NavbarKsr>
    ),
    children: [
      {
        index: true, // Halaman default di bawah /kasir
        element: <Kasir />,
      },
      {
        path: "profile", // Nested route untuk profile
        element: <ProfilePage />,
      },
    ],
  },

  // Owner Section
  {
    path: "/owner", // Route untuk Owner
    element: (
      <NavbarOwn>
        <Outlet />
      </NavbarOwn>
    ),
    children: [
      {
        index: true, // Halaman default di bawah /owner
        element: <DashboardOwn />,
      },
      {
        path: "profile", // Nested route untuk profile
        element: <ProfilePage />,
      },
    ],
  },
]);
