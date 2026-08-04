import { useContext, useEffect, useState } from "react";
import Card from "../Card";
import { getOrders } from "../../services/orderService";
import { useAuth } from "../../hooks/useAuth";
import AppContext from "../../context/context";
import { toast } from "react-toastify";

function Orders() {

    const { addToCart } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        async function fetchOrders() {
            try {

                const data = await getOrders(user.uid);

                setOrders(
                    data.flatMap(order => order.items)
                );

            } catch (error) {

                console.error(error);
                toast.error("Error loading orders");

            } finally {

                setIsLoading(false);

            }

        }

        fetchOrders();

    }, [user]);

    return (

        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1 className="text-center">Orders</h1>
            </div>
            {!isLoading && orders.length === 0 ? (
                <h2>You don't have any orders yet.</h2>
            ) :
                (<div className="sneakers d-flex justify-between flex-wrap">

                    {orders.map((item) => {
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
                )}

        </div>
    );

}

export default Orders;