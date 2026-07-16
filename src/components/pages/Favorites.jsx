import { useContext } from "react";
import Card from "../Card";
import AppContext from "../../context";


function Favorites({ addToCart }) {
    const { favorite, onAddToFavorite } = useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1 className="text-center">Favorite</h1>
            </div>

            <div className="sneakers d-flex justify-between flex-wrap">
                {favorite.map((item) => (
                    <Card
                        key={item.id}
                        id={item.productId}
                        title={item.title}
                        imgUrl={item.imgUrl}
                        price={item.price}
                        addFavorite={onAddToFavorite}
                        onPlus={addToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;