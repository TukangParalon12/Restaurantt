import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./page/Login";
import Kasir from "./Kasir/dahsboardKsr";
import NavbarKsr from "./Kasir/navKsr";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "Navbarksr",
    element: (
      <NavbarKsr>
        <Outlet /> {/* Komponen Outlet untuk merender children */}
      </NavbarKsr>
    ),
    children: [
      {
        index: true,
        element: <Kasir />,
      },
    ],
  },
]);
