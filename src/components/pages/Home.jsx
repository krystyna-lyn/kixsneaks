import Card from "../Card";


function Home({
    items,
    searchItem,
    addToCart,
    setSearchValue,
    searchValue,
    onAddToFavorite,
    cartItems,
    isLoading,
    favorite
}) {

    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()));

        return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                {...item}
                addToCart={(obj) => addToCart}
                addFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => addToCart(obj)}
                added={cartItems.some(obj => Number(obj.id) == Number(item.id))}
                loading={isLoading}
            />
        ))
    }

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
                {renderItems()}
            </div>

        </div>

    )

}

export default Home;