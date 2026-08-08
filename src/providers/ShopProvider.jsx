import { useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { getProducts } from "../services/productService";
import { useAuth } from "../hooks/useAuth";
import { getFavorites } from "../services/favoriteService";
import { addFavorite, removeFavorite } from "../services/favoriteService";
import { toast } from "react-toastify";
import {
    getCart,
    addCartItem,
    removeCartItem,
    updateCartQuantity
} from "../services/cartService";

function ShopProvider({ children }) {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, loading } = useAuth();

    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true);

                const products = await getProducts();
                setItems(products);

                if (user) {
                    const favorites = await getFavorites(user.uid);
                    setFavorite(favorites);

                    const cart = await getCart(user.uid);
                    console.log("CART FROM FIREBASE:", cart);
                    setCartItems(cart);
                } else {
                    setFavorite([]);
                    setCartItems([]);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (!loading) {
            loadData();
        }

    }, [user, loading]);


    const addToCart = async (obj) => {
        console.log("ADD TO CART:", obj);
        console.log("CURRENT CART:", cartItems);
        if (!user) return;

        try {
            const findItem = cartItems.find(
                item => String(item.productId) === String(obj.id)
            );

            if (findItem) {
                const newQuantity = (findItem.quantity || 1) + 1;
                console.log("NEW QUANTITY:", newQuantity);

                await updateCartQuantity(

                    findItem.id,
                    newQuantity
                );

                setCartItems(prev =>
                    prev.map(item =>
                        item.id === findItem.id
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );

            } else {

                const cartItem = {
                    userId: user.uid,
                    productId: obj.id,
                    title: obj.title,
                    price: obj.price,
                    imgUrl: obj.imgUrl,
                    quantity: 1
                };

                const id = await addCartItem(cartItem);

                setCartItems(prev => [
                    ...prev,
                    {
                        id,
                        ...cartItem
                    }
                ]);
            }

        } catch (error) {
            console.error(error);
            toast.error("Error updating cart");
        }
    };



    const onAddToFavorite = async (obj) => {

        if (!user) return;

        try {

            const findItem = favorite.find(
                item => String(item.productId) === String(obj.id)
            );

            if (findItem) {

                await removeFavorite(findItem.id);

                setFavorite(prev =>
                    prev.filter(item => item.id !== findItem.id)
                );

            } else {

                const favoriteItem = {
                    userId: user.uid,
                    productId: obj.id,
                    title: obj.title,
                    price: obj.price,
                    imgUrl: obj.imgUrl
                };

                const id = await addFavorite(favoriteItem);

                setFavorite(prev => [
                    ...prev,
                    {
                        id,
                        ...favoriteItem
                    }
                ]);
            }

        } catch (error) {
            console.log(error);
        }

    };

    const increaseQuantity = async (id) => {
        try {
            const item = cartItems.find(
                item => item.id === id
            );

            if (!item) return;

            const newQuantity = (item.quantity || 1) + 1;

            await updateCartQuantity(id, newQuantity);

            setCartItems(prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

        } catch (error) {
            console.error(error);
            toast.error("Error increasing quantity");
        }
    };

    const decreaseQuantity = async (id) => {
        try {
            const item = cartItems.find(
                item => item.id === id
            );

            if (!item) return;

            const newQuantity = (item.quantity || 1) - 1;

            if (newQuantity <= 0) {
                await removeCartItem(id);

                setCartItems(prev =>
                    prev.filter(item => item.id !== id)
                );

                return;
            }

            await updateCartQuantity(id, newQuantity);

            setCartItems(prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

        } catch (error) {
            console.error(error);
            toast.error("Error decreasing quantity");
        }
    };

    const deleteItem = async (id) => {
        try {
            await removeCartItem(id);

            setCartItems(prev =>
                prev.filter(item => item.id !== id)
            );
        } catch (error) {
            toast.error("Error deleting item from cart");
            console.error(error);
        }
    };


    const isItemAdded = (id) =>
        cartItems.some(
            item => String(item.productId) === String(id)
        );

    return (
        <ShopContext.Provider
            value={{
                user,
                loading,
                items,
                setItems,
                cartItems,
                setCartItems,
                favorite,
                setFavorite,
                isLoading,
                setIsLoading,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                onAddToFavorite,
                deleteItem,
                isItemAdded
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}

export default ShopProvider;