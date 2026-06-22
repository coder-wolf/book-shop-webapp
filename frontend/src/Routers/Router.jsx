import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import HomePage from "@/pages/HomePage/HomePage";
import BookDetailsPage from "@/pages/BookDetailsPage";
import CartPage from "@/pages/CartPage";
import FavoritesPage from "@/pages/FavoritesPage";

const router = createBrowserRouter([
    {
        path: "/", Component: Root,
        children: [
            { path: "/", Component: HomePage },
            { path: "/book/:id", Component: BookDetailsPage },
            { path: "/cart", Component: CartPage },
            { path: "/favorites", Component: FavoritesPage },
        ]
    },
]);

export default router;