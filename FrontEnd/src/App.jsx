import React from "react";
import "./App.css";
import { ProductList } from "./features/productList/ProductList";
// import {Navbar } from "./features/NavBar/Navbar";
import Home from "./pages/home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home/>
      </div>
    ),
  },
  {
    path: "/login",
    element: <div><LoginPage/></div>,
  },
  {
    path: "/signup",
    element: <div><SignupPage/></div>,
  },
]);

createRoot(document.getElementById("root")).render(
);
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
