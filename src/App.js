import 'macro-css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './components/pages/Favorites';
import { useEffect, useState } from 'react';

import { db } from "./firebase";

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AppContext from './context/context';
import Orders from './components/pages/Orders';
import { deleteDoc, doc } from "firebase/firestore";
import { getFavorites, addFavorite, removeFavorite } from "./services/favoriteService";
import { getCart, addCartItem, removeCartItem } from "./services/cartService";
import { useAuth } from "./hooks/useAuth";
import { getProducts } from "./services/productService";
import ProtectedRoute from "./components/routes/ProtectedRoute";


function App() {

  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [favorite, setFavorite] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [cartItems, setCartItems] = useState([])
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

  const searchItem = (event) => {
    //console.log(event.target.value)
    setSearchValue(event.target.value);
  }

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

  console.log(cartItems);

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorite,
        user,
        loading,
        addToCart,
        onAddToFavorite,
        isItemAdded,
        setCartOpened,
        setCartItems
      }}
    >

      <div className="wrapper clear">
        {cartOpened &&
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={(id) => deleteItem(id)}
            opened={cartOpened}
          />}

        <Header openCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              searchItem={searchItem}
              addToCart={addToCart}
              onAddToFavorite={onAddToFavorite}
              isLoading={isLoading}
            />
          }
            exact
          />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites
                addToCart={addToCart}
                favorited={true}
              />
            </ProtectedRoute>
          }
          />
          <Route path="/login" element={
            <Login />
          }
          />
          <Route path="/register" element={
            <Register />
          }
          />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
          />

        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
        />
      </div>
    </AppContext.Provider >
  );
}

export default App;
