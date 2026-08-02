import { useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { getProducts } from "../services/productService";

function ShopProvider({ children }) {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await getProducts();
                setItems(products);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    return (
        <ShopContext.Provider
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
        </ShopContext.Provider>
    );
}

export default ShopProvider;