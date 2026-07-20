import 'macro-css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './components/pages/Favorites';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { getDoc } from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";

import { onAuthStateChanged } from "firebase/auth";
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AppContext from './context';
import Orders from './components/pages/Orders';


function App() {

  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const [favoriteSnapshot, cartSnapshot, itemsSnapshot] =

          await Promise.all([
            getDocs(collection(db, "favorite")),
            getDocs(collection(db, "cart")),
            getDocs(collection(db, "items"))
          ]);

        setFavorite(
          favoriteSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setCartItems(
          cartSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setItems(
          itemsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        alert("Failed to load data.");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {

        setUser(currentUser);

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        }

      } else {

        setUser(null);
        setUserProfile(null);

      }

    });

    return () => unsubscribe();

  }, []);

  const addToCart = async (obj) => {
    try {

      const findItem = cartItems.find(
        item => item.productId === obj.id
      );

      if (findItem) {

        await deleteDoc(doc(db, "cart", findItem.id));

        setCartItems(prev =>
          prev.filter(item => item.id !== findItem.id)
        );

      } else {

        const docRef = await addDoc(collection(db, "cart"), {
          productId: obj.id,
          title: obj.title,
          price: obj.price,
          imgUrl: obj.imgUrl
        });

        setCartItems(prev => [
          ...prev,
          {
            id: docRef.id,
            productId: obj.id,
            title: obj.title,
            price: obj.price,
            imgUrl: obj.imgUrl
          }
        ]);

      }

    } catch (error) {
      console.error(error);
    }
  };


  const onAddToFavorite = async (obj) => {

    try {

      const findItem = favorite.find(
        item => item.productId === obj.id
      );

      if (findItem) {

        await deleteDoc(doc(db, "favorite", findItem.id));

        setFavorite(prev =>
          prev.filter(item => item.id !== findItem.id)
        );

      } else {

        const docRef = await addDoc(collection(db, "favorite"), {
          productId: obj.id,
          title: obj.title,
          price: obj.price,
          imgUrl: obj.imgUrl
        });

        setFavorite(prev => [
          ...prev,
          {
            id: docRef.id,
            productId: obj.id,
            title: obj.title,
            price: obj.price,
            imgUrl: obj.imgUrl
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
      await deleteDoc(doc(db, "cart", id));

      setCartItems(prev =>
        prev.filter(item => item.id !== id)
      );
    } catch (error) {
      alert("Error deleting item from cart");
      console.error(error);
    }
  };
  const isItemAdded = (id) => {
    return cartItems.some(item => item.productId === id);
  };

  console.log(cartItems);

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorite,

      user,
      userProfile,
      setUser,
      setUserProfile,

      isItemAdded,
      onAddToFavorite,

      setCartOpened,
      setCartItems
    }}>

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
            <Favorites
              addToCart={addToCart}
              favorited={true}
            />
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
            <Orders />
          }
          />

        </Routes>



      </div>
    </AppContext.Provider >
  );
}

export default App;
