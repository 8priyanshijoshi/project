import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
    const { orders, currency, Products } = useContext(ShopContext);
    const [loadedOrders, setLoadedOrders] = useState([]);

    useEffect(() => {
        console.log(" Orders.jsx - Orders from Context:", orders);
        const storedOrders = localStorage.getItem("orders");

        if (!orders.length && storedOrders && storedOrders !== "[]") {
            setLoadedOrders(JSON.parse(storedOrders)); // ✅ Load orders from storage if context is empty
        } else {
            setLoadedOrders(orders);
        }

        console.log(" Orders.jsx - Orders from Local Storage:", storedOrders);
    }, [orders]);

    if (!loadedOrders || loadedOrders.length === 0) {
        console.warn(" No orders found to display!");
        return <p className="text-gray-500 text-center">No orders found.</p>;
    }

    return (
        <div className='border-t pt-10'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {loadedOrders.map((order, index) => (
                    <div key={index} className='py-4  border-b text-gray-700 flex flex-col gap-4 pt-5'>
                        <p className='font-medium'>Order ID: {order.orderId}</p>
                        <p>Date: {order.date}</p>

                        {Object.keys(order.items).map((productId) => {
                            console.log(`🔎 Checking product ID: ${productId}`);
                            let product = Products.find((p) => String(p._id) === String(productId));

                            if (!product) {
                                console.warn(`Product not found for ID: ${productId}`);
                                return <p key={productId} className="text-red-500">Product not found (ID: {productId})</p>;
                            }

                            return (
                                <div key={productId} className='flex items-start gap-6 text-sm'>
                                    <img className='w-16 sm:w-20' src={product.image?.[0]} alt={product.name || "Product"} />
                                    <div>
                                        <p className='sm:text-base font-medium'>{product.name}</p>
                                        <p>Price: {currency}{product.price}</p>

                                        {Object.entries(order.items[productId]).map(([size, quantity]) => (
                                            <p key={size}>Size: {size} | Quantity: {quantity}</p>
                                        ))}
                                    </div>
                                    <div className='mr-50'> </div>
                                     <div className='md:w-1/2 flex justify-between'>
                                         <div className='flex items-center gap-2'>                                             <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                            <p className='text-sm md:text-base'>Ready to ship</p>
                                         </div>
                                         <button className='border px-4 py-2 text-sm font-medium rounded-sm'>TRACK ORDER</button>
                                     </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
