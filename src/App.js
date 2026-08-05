import 'macro-css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './components/pages/Favorites';
import { useState } from 'react';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AppContext from './context/context';
import Orders from './components/pages/Orders';

import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { useShop } from "./hooks/useShop";


function App() {


  const [cartOpened, setCartOpened] = useState(false);

  const { user, loading } = useAuth();

  const {
    items,
    cartItems,
    setCartItems,
    favorite,
    isLoading,
    addToCart,
    onAddToFavorite,
    isItemAdded
  } = useShop();



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
            opened={cartOpened}
          />}

        <Header openCart={() => setCartOpened(true)} />

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
