import React from "react";
import "./App.css";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/component/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/login",
    element:( <LoginPage />),
  },
  {
    path: "/signup",
    element:( <SignupPage />),
  },
  {
    path: "/cart",
    element: (<Protected><CartPage /></Protected>),
  },
  {
    path: "/checkout",
    element: (<Protected><Checkout /></Protected>),
  },
  {
    path: "/productdetail/:id",
    element: (<ProductDetailPage />),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Home/> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
    </div>
  );
}

export default App;
