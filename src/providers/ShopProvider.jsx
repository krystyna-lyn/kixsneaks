import { useState } from "react";
import AppContext from "../context";

function ShopProvider({ children }) {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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