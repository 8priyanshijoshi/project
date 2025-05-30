// // import React, { useContext } from 'react'
// // import { ShopContext } from '../context/ShopContext'
// // import Title from '../components/Title';

// // const Orders = () => {

// //     const {products, currency} = useContext(ShopContext); 

// //   return (
// //     <div className='border-t pt-16'>

// //         <div className='text-2xl'>
// //             <Title text1={'MY'} text2={'ORDERS'} />
// //         </div>

// //         <div>
// //             {
// //               products.slice(1,4).map((item,index) => (
// //                 <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:items-center md:justify-between gap-4'>
// //                     <div className='flex items-start gap-6 text-sm'>
// //                         <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
// //                         <div>
// //                           <p className='sm:text-base font-medium'>{item.name}</p>
// //                           <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
// //                             <p className='text-lg'>{currency}{item.price}</p>
// //                             <p>Quantity: 1</p>
// //                             <p>Size: 10</p>
// //                           </div>
// //                           <p className='mt-2'>Date: <span className='text-gray-400'>10, may, 2025</span></p>
// //                         </div>
// //                     </div>
// //                 </div>
// //               ))
// //             }
// //         </div>

// //     </div>
// //   )
// // }

// // export default Orders


// import React, { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { products } from "../assets/assets"; 

// const Orders = () => {
//     const { Products, currency } = useContext(ShopContext);

//     console.log("Products in Context:", Products);
//     console.log("Products in assets.js:", Products);



//     // Ensure products exists before slicing
//     if (!Products || Products.length === 0) {
//         return <p className="text-gray-500">No orders found.</p>;
//     }

//     return (
//         <div className='border-t pt-16'>
//             <div className='text-2xl'>
//                 <Title text1={'MY'} text2={'ORDERS'} />
//             </div>

//             <div>
//                 {products.slice(1, 4).map((item, index) => (
//                     <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:justify-between gap-4'>
//                         <div className='flex items-start gap-6 text-sm'>
//                             <img className='w-16 sm:w-20' src={item.image?.[0]} alt={item.name || "Product"} />
//                             <div>
//                                 <p className='sm:text-base font-medium'>{item.name}</p>
//                                 <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
//                                     <p className='text-lg'>{currency}{item.price}</p>
//                                     <p>Quantity: 1</p>
//                                     <p>Size: 10</p>
//                                 </div>
//                                 <p className='mt-2'>Date: <span className='text-gray-400'>10, May, 2025</span></p>
//                             </div>
//                         <div className='md:w-1/2 flex justify-between'>
//                           <div className='flex items-center gap-2'>
//                             <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                             <p className='text-sm md:text-base'>Ready to ship</p>
//                           </div>
//                           <button className='border px-4 py-2 text-sm font-medium rounded-sm'>TRACK ORDER</button>
//                         </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Orders;


// import React, { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';

// const Orders = () => {
//     const { orders, currency, products } = useContext(ShopContext);

//     console.log("Orders in Orders.jsx:", orders); // ✅ Debugging log

//     if (!orders || orders.length === 0) {
//         return <p className="text-gray-500">No orders found.</p>;
//     }

//     return (
//         <div className='border-t pt-16'>
//             <div className='text-2xl'>
//                 <Title text1={'MY'} text2={'ORDERS'} />
//             </div>

//             <div>
//                 {orders.map((order, index) => (
//                     <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col gap-4'>
//                         <p className='font-medium'>Order ID: {order.orderId}</p>
//                         <p>Date: {order.date}</p>

//                         {Object.keys(order.items).map((productId) => {
//                             let product = products.find((p) => p._id == productId);
//                             return product ? (
//                                 <div key={productId} className='flex items-start gap-6 text-sm'>
//                                     <img className='w-16 sm:w-20' src={product.image?.[0]} alt={product.name || "Product"} />
//                                     <div>
//                                         <p className='sm:text-base font-medium'>{product.name}</p>
//                                         <p>Price: {currency}{product.price}</p>
//                                         <p>Quantity: {order.items[productId]}</p>
//                                     </div>
//                                 </div>
//                             ) : null;
//                         })}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Orders;

// import React, { useContext } from 'react';
//  import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';

// const Orders = () => {

// const { orders, currency, Products } = useContext(ShopContext); // ✅ Use `Products` here

// console.log("Orders in Orders.jsx:", orders);
// console.log("Products in Orders.jsx:", Products);

// if (!orders || orders.length === 0) {
//     return <p className="text-gray-500">No orders found.</p>;
// }

// return (
//     <div className='border-t pt-16'>
//         <div className='text-2xl'>
//             <Title text1={'MY'} text2={'ORDERS'} />
//         </div>

//         <div>
//             {orders.map((order, index) => (
//                 <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col gap-4'>
//                     <p className='font-medium'>Order ID: {order.orderId}</p>
//                     <p>Date: {order.date}</p>

//                     {Object.keys(order.items).map((productId) => {
//                         if (!Products) return null; // ✅ Prevents error

//                         let product = Products.find((p) => p._id == productId);
//                         return product ? (
//                             <div key={productId} className='flex items-start gap-6 text-sm'>
//                                 <img className='w-16 sm:w-20' src={product.image?.[0]} alt={product.name || "Product"} />
//                                 <div>
//                                     <p className='sm:text-base font-medium'>{product.name}</p>
//                                     <p>Price: {currency}{product.price}</p>
//                                     <p>Quantity: {order.items[productId]}</p>
//                                 </div>
//                             </div>
//                         ) : null;
//                     })}
//                 </div>
//             ))}
//         </div>
//     </div>
// );
// }

// export default Orders;



import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
    const { orders, currency, Products } = useContext(ShopContext);

    console.log("Orders in Orders.jsx:", orders);
    console.log("Products in Orders.jsx:", Products);

    if (!orders || orders.length === 0) {
        return <p className="text-gray-500">No orders found.</p>;
    }

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {orders.map((order, index) => (
                    <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col gap-4'>
                        <p className='font-medium'>Order ID: {order.orderId}</p>
                        <p>Date: {order.date}</p>

                        {Object.keys(order.items).map((productId) => {
                            let product = Products.find((p) => p._id == productId);
                            if (!product) return null;

                            return (
                                <div key={productId} className='flex items-start gap-6 text-sm'>
                                    <img className='w-16 sm:w-20' src={product.image?.[0]} alt={product.name || "Product"} />
                                    <div>
                                        <p className='sm:text-base font-medium'>{product.name}</p>
                                        <p>Price: {currency}{product.price}</p>
                                        
                                        {/* ✅ Correctly extract size & quantity */}
                                        {Object.entries(order.items[productId]).map(([size, quantity]) => (
                                            <p key={size}>Size: {size} | Quantity: {quantity}</p>
                                        ))}
                                    </div>
                                    <div className='md:w-1/2 flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
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
