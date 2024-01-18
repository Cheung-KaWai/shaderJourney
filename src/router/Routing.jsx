import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Learning } from "../pages/Learning";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Learning />,
  },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
};
