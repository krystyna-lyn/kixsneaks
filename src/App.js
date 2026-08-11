import 'macro-css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Header from './components/pages/Header/Header';
import Drawer from './components/Drawer';
import Favorites from './components/pages/Favorites';
import { useState } from 'react';

import Home from './components/pages/Home/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Product from './components/pages/Product/Product';

import Orders from './components/pages/Orders';
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { useShop } from "./hooks/useShop";


function App() {

  const [cartOpened, setCartOpened] = useState(false);

  const {
    items,
    cartItems,
    isLoading,
    addToCart,
    onAddToFavorite,
  } = useShop();


  return (

    <div className="app">
      {cartOpened &&
        <Drawer
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />}

      <Header openCart={() => setCartOpened(true)} />
      <main className="container">
        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
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
          <Route path="/product/:id" element={
            <Product openCart={() => setCartOpened(true)} />
          } />
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
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
      />
    </div>

  );
}

export default App;
