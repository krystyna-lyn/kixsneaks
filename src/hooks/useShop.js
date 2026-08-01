import { useContext } from "react";
import AppContext from "../context";

export const useShop = () => {

    const { cartItems } = useContext(AppContext);

    const isItemAdded = (id) => {
        return cartItems.some(
            item => String(item.productId) === String(id)
        );
    };

    return {
        isItemAdded
    };
};