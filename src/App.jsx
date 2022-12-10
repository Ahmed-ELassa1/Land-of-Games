import { useState, useEffect, useContext } from "react";
import {  createHashRouter, RouterProvider } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { CategoriesContext } from "./context/CategoriesStore";
import { PlatformContext } from "./context/platformStore";
import { SortbyContext } from "./context/sortbyStore";
import Home from "./Component/Home/Home.jsx";
import MasterLayout from "./Component/MasterLayout/MasterLayout";
import NotFound from "./Component/NotFound/NotFound";
import All from "./Component/All/All";
import Platforms from "./Component/Platforms/Platforms";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import SortBy from "./Component/Sortby/Sortby";
import Categories from "./Component/Categories/Categories";
import GamePage from "./Component/GamePage/GamePage";
import "./App.css";


export default function App() {
  let { platformLink } = useContext(PlatformContext);
  let { sortbyLink } = useContext(SortbyContext);
  let { categoriesLink } = useContext(CategoriesContext);

  let [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      saveUserData();
    }
  }, []);

  function ProtectedRouter(props) {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  function saveUserData() {
    let token = localStorage.getItem("token");
    let data = jwt_decode(token);
    setUser(data);
  }

  function logOut() {
    localStorage.clear("token");
    setUser(null);
    return <Navigate to="/login" />;
  }
  const Routers = createHashRouter([
    {
      path: "/",
      element: <MasterLayout user={user} logOut={logOut} />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "/all",
          element: (
            <ProtectedRouter>
              <All />
            </ProtectedRouter>
          ),
        },
        {
          path: `platforms/${platformLink}`,
          element: (
            <ProtectedRouter>
              <Platforms />
            </ProtectedRouter>
          ),
        },

        {
          path: `sort-by/${sortbyLink}`,
          element: (
            <ProtectedRouter>
              <SortBy />
            </ProtectedRouter>
          ),
        },
        {
          path: `categories/${categoriesLink}`,
          element: (
            <ProtectedRouter>
              <Categories />
            </ProtectedRouter>
          ),
        },
        {
          path: `/gameDetails/:id`,
          element: (
            <ProtectedRouter>
              <GamePage />
            </ProtectedRouter>
          ),
        },
        { path: "login", element: <Login saveUser={saveUserData} /> },
        { path: "register", element: <Register /> },
        {
          path: "*",
          element: (
            <ProtectedRouter>
              <NotFound />
            </ProtectedRouter>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={Routers} />;
}
