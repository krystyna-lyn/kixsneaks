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

    const mergeGuestCart = async (user, firebaseCart) => {
        const savedCart = localStorage.getItem(
            "kixsneaks_guest_cart"
        );

        if (!savedCart) {
            return firebaseCart;
        }

        try {
            const guestCart = JSON.parse(savedCart);

            if (!guestCart.length) {
                return firebaseCart;
            }

            const mergedCart = [...firebaseCart];

            for (const guestItem of guestCart) {
                const existingItem = mergedCart.find(
                    item =>
                        String(item.productId) ===
                        String(guestItem.productId)
                );

                if (existingItem) {
                    const newQuantity =
                        (existingItem.quantity || 1) +
                        (guestItem.quantity || 1);

                    await updateCartQuantity(
                        existingItem.id,
                        newQuantity
                    );

                    existingItem.quantity = newQuantity;

                } else {
                    const cartItem = {
                        userId: user.uid,
                        productId: guestItem.productId,
                        title: guestItem.title,
                        price: guestItem.price,
                        imgUrl: guestItem.imgUrl,
                        quantity: guestItem.quantity || 1
                    };

                    const id = await addCartItem(cartItem);

                    mergedCart.push({
                        id,
                        ...cartItem
                    });
                }
            }

            localStorage.removeItem(
                "kixsneaks_guest_cart"
            );

            return mergedCart;

        } catch (error) {
            console.error(
                "Error merging guest cart:",
                error
            );

            return firebaseCart;
        }
    };

    useEffect(() => {

        async function loadData() {
            try {
                setIsLoading(true);

                const products = await getProducts();
                setItems(products);

                if (user) {
                    const favorites = await getFavorites(user.uid);
                    setFavorite(favorites);

                    const firebaseCart = await getCart(user.uid);

                    const mergedCart = await mergeGuestCart(
                        user,
                        firebaseCart
                    );

                    setCartItems(mergedCart);

                } else {
                    setFavorite([]);

                    const savedCart = localStorage.getItem(
                        "kixsneaks_guest_cart"
                    );

                    if (savedCart) {
                        setCartItems(JSON.parse(savedCart));
                    } else {
                        setCartItems([]);
                    }
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
        try {
            const findItem = cartItems.find(
                item => String(item.productId) === String(obj.id)
            );

            if (findItem) {
                const newQuantity = (findItem.quantity || 1) + 1;

                const updatedCart = cartItems.map(item =>
                    item.id === findItem.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );

                if (user) {
                    await updateCartQuantity(
                        findItem.id,
                        newQuantity
                    );
                } else {
                    localStorage.setItem(
                        "kixsneaks_guest_cart",
                        JSON.stringify(updatedCart)
                    );
                }

                setCartItems(updatedCart);

                return;
            }
            const cartItem = {
                productId: obj.id,
                title: obj.title,
                price: obj.price,
                imgUrl: obj.imgUrl,
                quantity: 1
            };

            if (user) {
                const firebaseCartItem = {
                    userId: user.uid,
                    ...cartItem
                };

                const id = await addCartItem(firebaseCartItem);

                setCartItems(prev => [
                    ...prev,
                    {
                        id,
                        ...firebaseCartItem
                    }
                ]);
            } else {
                const guestCartItem = {
                    id: `guest-${obj.id}`,
                    ...cartItem
                };

                const updatedCart = [
                    ...cartItems,
                    guestCartItem
                ];

                setCartItems(updatedCart);

                localStorage.setItem(
                    "kixsneaks_guest_cart",
                    JSON.stringify(updatedCart)
                );
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


    const increaseQuantity = async (productId) => {
        try {
            const cartItem = cartItems.find(
                item => String(item.productId) === String(productId)
            );

            if (!cartItem) return;

            const newQuantity = (cartItem.quantity || 1) + 1;

            const updatedCart = cartItems.map(item =>
                item.id === cartItem.id
                    ? { ...item, quantity: newQuantity }
                    : item
            );

            if (user) {
                await updateCartQuantity(
                    cartItem.id,
                    newQuantity
                );
            } else {
                localStorage.setItem(
                    "kixsneaks_guest_cart",
                    JSON.stringify(updatedCart)
                );
            }

            setCartItems(updatedCart);

        } catch (error) {
            console.error(error);
            toast.error("Error increasing quantity");
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            const cartItem = cartItems.find(
                item => String(item.productId) === String(productId)
            );

            if (!cartItem) return;

            const newQuantity = (cartItem.quantity || 1) - 1;

            if (newQuantity <= 0) {
                if (user) {
                    await removeCartItem(cartItem.id);
                }

                const updatedCart = cartItems.filter(
                    item => item.id !== cartItem.id
                );

                setCartItems(updatedCart);

                if (!user) {
                    localStorage.setItem(
                        "kixsneaks_guest_cart",
                        JSON.stringify(updatedCart)
                    );
                }

                return;
            }

            const updatedCart = cartItems.map(item =>
                item.id === cartItem.id
                    ? { ...item, quantity: newQuantity }
                    : item
            );

            if (user) {
                await updateCartQuantity(
                    cartItem.id,
                    newQuantity
                );
            } else {
                localStorage.setItem(
                    "kixsneaks_guest_cart",
                    JSON.stringify(updatedCart)
                );
            }

            setCartItems(updatedCart);

        } catch (error) {
            console.error(error);
            toast.error("Error decreasing quantity");
        }
    };
    const deleteItem = async (id) => {
        try {
            if (user) {
                await removeCartItem(id);
            }

            const updatedCart = cartItems.filter(
                item => item.id !== id
            );

            setCartItems(updatedCart);

            if (!user) {
                localStorage.setItem(
                    "kixsneaks_guest_cart",
                    JSON.stringify(updatedCart)
                );
            }

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