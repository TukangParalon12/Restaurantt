import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./page/Login";
import Kasir from "./Kasir/dashboardKsr";
import NavbarKsr from "./Kasir/navKsr";
import NavbarOwn from "./Owner/navOwn";
import DashboardOwn from "./Owner/dashboardOwn";
import ProfilePage from "./page/Profile";
import ProdukPage from "./page/produk";
import Gudang from "./Gudang/dashboardGdg";
import NavbarGdg from "./Gudang/navGdg";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Halaman Login
  },

  {
    path: "/kasir",
    element: (
      <NavbarKsr>
        <Outlet />
      </NavbarKsr>
    ),
    children: [
      {
        index: true,
        element: <Kasir />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: "/owner",
    element: (
      <NavbarOwn>
        <Outlet />
      </NavbarOwn>
    ),
    children: [
      {
        index: true,
        element: <DashboardOwn />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "produk",
        element: <ProdukPage />,
      },
    ],
  },

  {
    path: "/gudang",
    element: (
      <NavbarGdg>
        <Outlet />
      </NavbarGdg>
    ),
    children: [
      {
        index: true,
        element: <Gudang />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
