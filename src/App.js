import 'macro-css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';


function App() {

  const arr = [
    { id: 1, title: 'Card 1', imgUrl: './img/sneakers/1.jpg', price: 100 },
    { id: 2, title: 'Card 2', imgUrl: './img/sneakers/2.jpg', price: 200 },
    { id: 3, title: 'Card 3', imgUrl: './img/sneakers/3.jpg', price: 300 },
    { id: 4, title: 'Card 4', imgUrl: './img/sneakers/4.jpg', price: 500 },
  ]

  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
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
            arr.map(obj => {
              return (
                <Card
                  key={obj.id}
                  id={obj.id}
                  title={obj.title}
                  imgUrl={obj.imgUrl}
                  price={obj.price}
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
