import { useContext, useEffect, useState } from "react";
import Card from "../Card";
import AppContext from "../../context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function Orders({ }) {
    const { addToCart } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchOrders() {

            try {

                const snapshot = await getDocs(
                    collection(db, "orders")
                );

                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setOrders(
                    data.flatMap(order => order.items)
                );

            } catch (error) {

                console.error(error);
                alert("Error loading orders");

            } finally {

                setIsLoading(false);

            }

        }

        fetchOrders();

    }, []);

    return (

        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 className="text-center">Orders</h1>
            </div>
            <div className="sneakers d-flex justify-between flex-wrap">

                {orders.map((item, index) => {
                    return (
                        <Card
                            key={item.productId}
                            {...item}
                            onPlus={addToCart}
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