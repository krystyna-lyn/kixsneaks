import Card from "../Card";

function Favorites({ favorite, addToCart, onAddToFavorite }) {
    return (

        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 className="text-center">Favorite</h1>
            </div>
            <div className="sneakers d-flex justify-between flex-wrap">

                {favorite
                    .map(item => {
                        return (
                            <Card
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                imgUrl={item.imgUrl}
                                price={item.price}
                                addToCart={(obj) => addToCart}
                                addFavorite={(obj) => onAddToFavorite(obj)}
                                favorited={true}
                                onPlus={(obj) => addToCart(obj)}
                            />
                        )
                    })
                }
            </div>
        </div>
    );

}

export default Favorites;