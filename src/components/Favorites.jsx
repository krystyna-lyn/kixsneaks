import Card from "./Card";

function Favorites({ favorite, addToCart }) {
    return (
        <div>
            <h1 className="text-center">Favorites</h1>

            <div className="sneakers d-flex justify-between flex-wrap">

                {
                    favorite
                        .map(item => {
                            return (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    imgUrl={item.imgUrl}
                                    price={item.price}
                                    addToCart={() => console.log('added')}
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