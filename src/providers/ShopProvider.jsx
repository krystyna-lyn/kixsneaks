import { useState } from "react";
import AppContext from "../context";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function ShopProvider({ children }) {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // load products from productService
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setItems(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    return (
        <AppContext.Provider
            value={{
                items,
                setItems,

                cartItems,
                setCartItems,

                favorite,
                setFavorite,

                isLoading,
                setIsLoading
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default ShopProvider;