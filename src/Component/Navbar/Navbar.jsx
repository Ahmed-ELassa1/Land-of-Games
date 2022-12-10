import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import navImage from "../../images/logo.png";
import { PlatformContext } from './../../context/platformStore';
import { SortbyContext } from './../../context/sortbyStore';
import { CategoriesContext } from "../../context/CategoriesStore";
export default function Navbar( props ) {
let {user, logOut } = props




let {platformLists} = useContext(PlatformContext);
let {sortbyLists} = useContext(SortbyContext);
let {CategoriesLists} = useContext(CategoriesContext);
 



return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={navImage} alt="" className="nav-image" />
          game over
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {user != null ? (
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/all">all</NavLink>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  id="platforms"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  platforms
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item platforms-link" onClick={platformLists} to={`/platforms/pc`} id="pc">
                      pc
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item platforms-link" onClick={platformLists} to={`/platforms/browser`} id="browser">
                    browser
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  sort-by
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" onClick={sortbyLists} to="/sort-by/release-data">
                      release-data
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={sortbyLists} to="/sort-by/popularity">
                      popularity
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={sortbyLists} to="/sort-by/alphabetical">
                      alphabetical
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={sortbyLists} to="/sort-by/relevance">
                      relevance
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  categories
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/racing">
                      racing
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/sports">
                      sports
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/social">
                      social
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/shooter">
                      shooter
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/open-world">
                      open-world
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/zombie">
                      zombie
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/fantasy">
                      fantasy
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/action-rgb">
                      action-rgb
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/action">
                      action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/flight">
                      flight
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={CategoriesLists} to="/categories/battle-royale">
                      battle-royale
                    </Link>
                  </li>
                </ul>
              </li>

              <button type="button" className="btn ms-auto" onClick={logOut} id="logout">
                logout
              </button>
            </ul>
          ) : (
            <div className="register ms-auto">
              <Link id="login" to="/login">
                login
              </Link>
              <Link to="register" className="btn" id="register">
                join free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
