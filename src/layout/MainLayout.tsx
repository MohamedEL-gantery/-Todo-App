import { Outlet, Link } from "react-router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = Cookies.get("user");
    setIsLoggedIn(!!userData);
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setIsLoggedIn(false);

    window.location.href = "/";
  };

  return (
    <>
      <div
        className="navbar  shadow-sm"
        style={{
          backgroundColor: "#1e202e",
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              style={{
                backgroundColor: "#1e202e",
              }}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" to="/">
            Home
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-ghost text-xl">
              Logout
            </button>
          ) : (
            <Link className="btn btn-ghost text-xl" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>

      <main>
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
