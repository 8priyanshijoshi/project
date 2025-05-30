import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { Products, currency, cartItems, updateQuantity } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure cart items are properly processed
        if (cartItems && Object.keys(cartItems).length > 0) {
            const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
                Object.entries(sizes)
                    .filter(([size, quantity]) => quantity > 0)
                    .map(([size, quantity]) => ({ _id: itemId, size, quantity }))
            );
            setCartData(tempData);
        } else {
            setCartData([]); // Clear cart if no items exist
        }
    }, [cartItems]);

    if (!Products || !Array.isArray(Products)) {
        console.error('Products is undefined or not an array.');
        return <p>Loading cart...</p>;
    }

    console.log("Product IDs in Products:", Products.map(product => product._id));

    console.log("Cart Items:", cartItems);


    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1="YOUR" text2="CART" />
            </div>
            <div>
                {cartData.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartData.map((item, index) => {
                        const productData = Products.find((product) => product._id == item._id);
                        
                        if (!productData) {
                            console.warn(`Product not found for ID: ${item._id}`);
                            return <p key={`missing-${index}`}>Product not found.</p>;
                        }

                        return (
                            
                            <div key={`${item._id}-${item.size}`}
                                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols[4fr_2fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img className="w-16 sm:w-20" src={productData.image[0]}alt="" />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                                        <div className="flex items-center gap-5 mt-2 ">
                                            <p>{currency}{productData.price}</p>
                                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                    <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))}  type='number' min={1} defaultValue={item.quantity}/>
                                    <img onClick={()=> updateQuantity(item._id,item.size,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />                                    
                            </div>
                           
                        );
                    })
                )}
            </div>
            <div className='flex justify-end my-20 '>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal/>
                    <div className='w-full text-end'>
                        <button onClick={ () => navigate('/place-Order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

