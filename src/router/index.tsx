import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorHandler from "../components/Errors/ErrorHandler";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SingInPage";
import PageNotFound from "../pages/PageNotFound";
import HomePage from "../pages/HomePage";
import TodoPage from "../pages/TodoPage";

import Cookies from "js-cookie";

const storageKey = "user";
const userDataString = Cookies.get(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorHandler />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: (
          <ProtectedRoute
            isAllowed={!userData?.accessToken}
            redirectPath="/"
            data={userData}
          >
            <SignInPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute
            isAllowed={!userData?.accessToken}
            redirectPath="/login"
            data={userData}
          >
            <SignUpPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "todos",
        element: (
          <ProtectedRoute
            isAllowed={userData?.accessToken}
            redirectPath="/login"
            data={userData}
          >
            <TodoPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
