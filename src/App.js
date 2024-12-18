import 'macro-css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './components/pages/Favorites';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AppContext from './context';
import Orders from './components/pages/Orders';


function App() {

  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      //axios.get('http://localhost:8000/items').then((res) => {
      //setitems(res.data)})
      try {
        const [favoriteRes, cartRes, itemsRes] = await Promise.all([
          axios.get('http://localhost:8000/favorite'),
          axios.get('http://localhost:8000/cart'),
          axios.get('http://localhost:8000/items'),
        ])
        setIsLoading(false);
        setFavorite(favoriteRes.data);
        setCartItems(cartRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        alert('Failed to load data. Please check your internet connection.')
        console.error(error);
      }
    }

    fetchData();
  }, [])

  const addToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`http://localhost:8000/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('http://localhost:8000/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Failed to add item to cart');
      console.error(error);
    }
  };


  const onAddToFavorite = async (obj) => {
    try {
      if (Array.isArray(favorite) && favorite.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`http://localhost:8000/favorite/${obj.id}`);
        setFavorite(prev => prev.filter((item) => item.id !== obj.id));
      }
      else {
        const { data } = await axios.post('http://localhost:8000/favorite', obj,);
        setFavorite((prev) => [...prev, data]);
      }
    }
    catch (error) {
      console.error(error);
      alert('Failed to add item to favorite');
    }

  }

  const searchItem = (event) => {
    //console.log(event.target.value)
    setSearchValue(event.target.value);
  }

  const deleteItem = (id) => {
    try {
      axios.delete(`http://localhost:8000/cart/${id}`);
      setCartItems(prev => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Error deleting item from cart');
      console.error(error);
    }


  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

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
