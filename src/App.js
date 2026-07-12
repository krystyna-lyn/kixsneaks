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

import { db } from "./firebase";
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

  const addToCart = async (obj) => {
    try {
      const findItem = favorite.find(
        item => Number(item.parentId) === Number(obj.id)
      );

      if (findItem) {

        await deleteDoc(doc(db, "cart", findItem.id));

        setCartItems(prev =>
          prev.filter(item => Number(item.parentId) !== Number(obj.id))
        );

      } else {

        const docRef = await addDoc(
          collection(db, "cart"),
          {
            ...obj,
            parentId: obj.id,
          }
        );

        setCartItems(prev => [
          ...prev,
          {
            ...obj,
            id: docRef.id,
            parentId: obj.id,
          },
        ]);
      }

    } catch (error) {
      console.error(error);
    }
  };


  const onAddToFavorite = async (obj) => {

    try {

      const findItem =
        favorite.find(
          item => item.parentId === obj.id
        );

      if (findItem) {

        await deleteDoc(
          doc(db, "favorite", findItem.id)
        );

        setFavorite(prev =>
          prev.filter(item => item.id !== findItem.id)
        );

      } else {

        const docRef =
          await addDoc(
            collection(db, "favorite"),
            {
              ...obj,
              parentId: obj.id
            }
          );

        setFavorite(prev => [
          ...prev,
          {
            ...obj,
            parentId: obj.id,
            id: docRef.id
          }
        ]);

      }

    } catch (error) {

      console.log(error);

    }

  }

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
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  console.log(cartItems);

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorite,
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
