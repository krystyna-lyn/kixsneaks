import { useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { getProducts } from "../services/productService";
import { useAuth } from "../hooks/useAuth";
import { getFavorites } from "../services/favoriteService";
import { getCart } from "../services/cartService";
import { db } from "../firebase";
import { addCartItem } from "../services/cartService";
import { deleteDoc, doc } from "firebase/firestore";
import { addFavorite, removeFavorite } from "../services/favoriteService";
import { removeCartItem } from "../services/cartService";
import { toast } from "react-toastify";

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
        if (!user) return;

        try {
            const findItem = cartItems.find(
                item => String(item.productId) === String(obj.id)
            );

            if (findItem) {

                await deleteDoc(doc(db, "cart", findItem.id));

                setCartItems(prev =>
                    prev.filter(item => item.id !== findItem.id)
                );

            } else {
                const cartItem = {
                    userId: user.uid,
                    productId: obj.id,
                    title: obj.title,
                    price: obj.price,
                    imgUrl: obj.imgUrl,
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