import { useContext } from "react";
import AppContext from "../context/context";

export const useCart = () => {
    const { cartItems, setCartItems } = useContext(AppContext);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price,
        0
    );

    return {
        cartItems,
        setCartItems,
        totalPrice
    };
};