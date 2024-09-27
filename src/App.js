import 'macro-css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './components/pages/Favorites';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/pages/Home';


function App() {

  const [items, setitems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [cartItems, setcartItems] = useState([])
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {

    async function fetchData() {

      //axios.get('http://localhost:8000/items').then((res) => {
      //setitems(res.data)})
      const favoriteRes = await axios.get('http://localhost:8000/favorite');
      const cartRes = await axios.get('http://localhost:8000/cart');
      const itemsRes = await axios.get('http://localhost:8000/items');

      setFavorite(favoriteRes.data);
      setcartItems(cartRes.data);
      setitems(itemsRes.data);
    }
    fetchData();
  }, [])

  const addToCart = (obj) => {
    axios.post('http://localhost:8000/cart', obj);
    setcartItems(prev => [...prev, obj])
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((favObj) => favObj.id == obj.id)) {
        axios.delete(`http://localhost:8000/favorite/${obj.id}`);
        setFavorite(prev => prev.filter((item) => item.id !== obj.id));
      }
      else {
        const { data } = await axios.post('http://localhost:8000/favorite', obj,);
        setFavorite((prev) => [...prev, data]);
      }
    }
    catch (error) {
      console.log('The product can not be added to favorites')
    }

  }

  const searchItem = (event) => {
    //console.log(event.target.value)
    setSearchValue(event.target.value);
  }


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
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchItem={searchItem}
            addToCart={addToCart}
            onAddToFavorite={onAddToFavorite}
            favorited={false}
          />
        }
          exact
        />
        <Route path="/favorites" element={
          <Favorites
            favorite={favorite}
            addToCart={addToCart}
            onAddToFavorite={onAddToFavorite}
            favorited={true}
          />
        }
        />
      </Routes>



    </div>
  );
}

export default App;
