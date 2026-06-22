import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import HomePage from "@/pages/HomePage/HomePage";

const router = createBrowserRouter([
    {
        path: "/", Component: Root,
        children: [
            { path: "/", Component: HomePage },
        ]
    },
]);

export default router;