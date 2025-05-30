import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const Latest_Collection = () => {
    const { Products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (Products && Array.isArray(Products) && Products.length > 0) {
            console.log("Before setting state:", Products.slice(0, 10));
            setLatestProducts(Products.slice(0, 10));
        }
    }, [Products]); 

    console.log("latestProducts state:", latestProducts);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Neque iure beatae facilis provident. Alias nisi temporibus.
                </p>
            </div>

            {/* Rendering products */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.length > 0 ? (
                    latestProducts.map((product, index) => ( 
                        <Productitem key={index} 
                            id={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            className="w-36 h-36 object-cover"
                        />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default Latest_Collection;