import Card from "./Card";


function Home({ items, searchItem, addToCart, setSearchValue, searchValue, onAddToFavorite }) {


    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>{searchValue ? `search for '${searchValue}'` : 'All sneakers'}</h1>
                <div className="search-block d-flex">
                    <img src="./img/search.svg" alt="search" />
                    {searchValue && (
                        <img className='clear cu-p'
                            onClick={() => setSearchValue('')}
                            src="./img/btn-remove.svg"
                            alt="remove" />
                    )}

                    <input onChange={searchItem} value={searchValue} type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="sneakers d-flex justify-between flex-wrap">

                {
                    items
                        .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .map(item => {
                            return (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    imgUrl={item.imgUrl}
                                    price={item.price}
                                    addToCart={() => console.log('added')}
                                    addFavorite={(obj) => onAddToFavorite(obj)}
                                    onPlus={(obj) => addToCart(obj)}
                                />
                            )
                        })
                }
            </div>

        </div>

    )

}

export default Home;