import { lazy } from "react";
import { RouteObject, Navigate } from "react-router-dom";

const Register = lazy(() => import("@/pages/Register"));
const Home = lazy(() => import("@/pages/Home"));

const privateRoutes: RouteObject[] = [
	{ path: "/", element: <Home /> },
	{ path: "*", element: <Navigate to={"/"} /> },
];

const publicRoutes: RouteObject[] = [
	{ path: "/", element: <Register /> },
	{ path: "*", element: <Navigate to={"/"} /> },
];

export { privateRoutes, publicRoutes };
