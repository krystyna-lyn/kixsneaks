import { useContext, useEffect, useState } from "react";
import Card from "../Card";
import AppContext from "../../context";
import axios from "axios";

function Orders({ }) {
    const { addToCart } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            (async () => {
                const { data } = await axios.get('http://localhost:8000/orders');
                //console.log(data.map((obj) => obj.items.flat()))
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false);
            })();
        } catch (error) {
            alert("Error fetching orders. Please try again later.")
        }
    }, [])

    return (

        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 className="text-center">Orders</h1>
            </div>
            <div className="sneakers d-flex justify-between flex-wrap">

                {orders.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            {...item}
                            addToCart={(obj) => addToCart}
                            loading={isLoading}
                        />
                    )
                })
                }
            </div>
        </div>
    );

}

export default Orders;