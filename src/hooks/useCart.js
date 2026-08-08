import { useShop } from "./useShop";

export const useCart = () => {
    const { cartItems, setCartItems } = useShop();

    const totalPrice = cartItems.reduce(
        (sum, item) =>
            sum + item.price * (item.quantity || 1),
        0
    );

    return {
        cartItems,
        setCartItems,
        totalPrice
    };
};