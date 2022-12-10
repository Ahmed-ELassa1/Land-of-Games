import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";

export default function MasterLayout({ user, logOut }) {

  return (
    <div>
        <Navbar user={user} logOut={logOut} />
        <Outlet />
    </div>
  );
}
