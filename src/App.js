import 'macro-css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';



function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
        <Drawer />
      </div>
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
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

      </div>
    </div>
  );
}

export default App;
