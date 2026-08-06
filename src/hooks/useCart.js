import { useShop } from "./useShop";

export const useCart = () => {
    const { cartItems, setCartItems } = useShop();

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