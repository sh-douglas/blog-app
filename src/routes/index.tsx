import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { PostDetail } from "../pages/PostDetail";
import { Profile } from "../pages/Profile";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Admin } from "../pages/Admin";
import { PublishedPosts } from "../pages/PublishedPosts";
import { DraftPosts } from "../pages/DraftPosts";
import { ManageUsers } from "../pages/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post/details/:id",
        element: <PostDetail />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["director", "editor"]}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/published",
        element: (
          <ProtectedRoute allowedRoles={["director", "editor"]}>
            <PublishedPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/drafts",
        element: (
          <ProtectedRoute allowedRoles={["director", "editor"]}>
            <DraftPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <ProtectedRoute allowedRoles={["director"]}>
            <ManageUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export { router };
