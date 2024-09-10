import 'macro-css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';
import { useEffect, useState } from 'react';


function App() {
  const [items, setitems] = useState([])
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://66df7092de4426916ee49649.mockapi.io/items').then((res) => {
      return res.json()
    }).then((json) => {
      setitems(json)
    })
  }, [])

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      <Header openCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
          <h1 className=''>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="./img/search.svg" alt="search" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="sneakers d-flex justify-between flex-wrap">

          {
            items.map(obj => {
              return (
                <Card
                  key={obj.id}
                  id={obj.id}
                  title={obj.title}
                  imgUrl={obj.imgUrl}
                  price={obj.price}
                  addToCart={() => console.log('added')}
                />
              )
            })
          }
        </div>

      </div>
    </div>
  );
}

export default App;
