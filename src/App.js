import 'macro-css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './components/Favorites';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/Home';


function App() {

  const [items, setitems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [cartItems, setcartItems] = useState([])
  const [searchValue, setSearchValue] = useState('');



  const addToCart = (obj) => {
    axios.post('http://localhost:8000/cart', obj);
    setcartItems(prev => [...prev, obj])
  }

  const onAddToFavorite = (obj) => {
    axios.post(
      'http://localhost:8000/favorite', obj,);
    setFavorite((prev) => [...prev, obj]);

  }

  const searchItem = (event) => {
    //console.log(event.target.value)
    setSearchValue(event.target.value);
  }


  useEffect(() => {

    axios.get('http://localhost:8000/items').then((res) => {
      setitems(res.data)
    })
    axios.get('http://localhost:8000/cart').then((res) => {
      setcartItems(res.data)
    })
    axios.get('http://localhost:8000/favorite').then((res) => {
      setFavorite(res.data)
    })

  }, [])



  const deleteItem = (id) => {
    axios.delete(`http://localhost:8000/cart/${id}`);
    setcartItems(prev => prev.filter((item) => item.id !== id));

  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer cartItems={cartItems} onClose={() => setCartOpened(false)} onRemove={(id) => deleteItem(id)} />}

      <Header openCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" element={
          <Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchItem={searchItem}
            addToCart={addToCart}
            onAddToFavorite={onAddToFavorite}
          />
        }
          exact
        />
        <Route path="/favorites" element={
          <Favorites
            favorite={favorite}
            addToCart={addToCart}
          />
        }
        />
      </Routes>



    </div>
  );
}

export default App;
