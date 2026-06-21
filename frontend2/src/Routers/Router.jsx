import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage/HomePage";
import Root from "../layouts/Root";

const router = createBrowserRouter([
    {
        path: "/", Component: Root,
        children: [
            { path: "/", Component: HomePage },
        ]
    },
]);

export default router;