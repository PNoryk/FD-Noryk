import "@/scss/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/pages/_layout/Layout.jsx";
import { RequireAuth } from "@/pages/_requere-auth/RequireAuth";
import { ErrorPage } from "@/pages/error-page.jsx";
import { Favorites } from "@/pages/favorites/Favorites";
import { Home } from "@/pages/home/Home.jsx";
import { SignIn } from "@/pages/sign-in/SignIn.jsx";
import { SignUp } from "@/pages/sign-up/SignUp.jsx";
import { store } from "@/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/favorites",
            element: <Favorites />,
          },
        ],
      },
    ],
  },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
