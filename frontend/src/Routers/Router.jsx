import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import HomePage from "@/pages/HomePage/HomePage";
import BookDetailsPage from "@/pages/BookDetailsPage";

const router = createBrowserRouter([
    {
        path: "/", Component: Root,
        children: [
            { path: "/", Component: HomePage },
            { path: "/book/:id", Component: BookDetailsPage },
        ]
    },
]);

export default router;