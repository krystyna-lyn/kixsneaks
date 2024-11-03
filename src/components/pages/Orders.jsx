import { useContext, useEffect } from "react";
import Card from "../Card";
import AppContext from "../../context";
import axios from "axios";

function Orders({ }) {
    const { favorite, onAddToFavorite } = useContext(AppContext);
    useEffect(() => {

        (async () => {
            const { data } = await axios.get('http://localhost:8000/orders');
            console.log(data)
        })();
    }, [])

    return (

        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 className="text-center">Orders</h1>
            </div>
            <div className="sneakers d-flex justify-between flex-wrap">

                {[]
                    .map(item => {
                        return (
                            <Card />
                        )
                    })
                }
            </div>
        </div>
    );

}

export default Orders;