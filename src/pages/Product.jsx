import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {
    const { productId } = useParams();
    const { Products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
;

    const fetchProductData = () => {
        if (!Products || !Array.isArray(Products)) {
            console.error("Products is undefined, not an array, or empty.");
            return;
        }

        const foundProduct = Products.find(item => String(item._id) === productId);

        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image?.[0] || 'https://example.com/default-placeholder.jpg'); // Fallback image
            console.log("Found Product:", foundProduct);
        } else {
            console.error("Product not found in the list!");
        }
    };

    console.log("Products from context:", Products);
Products.forEach(product => console.log("Product ID in list:", product._id));

useEffect(() => {
  if (Products && Array.isArray(Products) && Products.length > 0) {
      fetchProductData();
  } else {
      console.error("Products is not available yet!");
  }
}, [Products, productId]);

  

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-hidden sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
                        {/* Ensure images exist before mapping */}
                        {productData.image?.length > 0 ? (
                            productData.image.map((item, index) => (
                                <img onClick={()=>setImage(item)} 
                                    src={item} 
                                    key={index} 
                                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                                    alt={`Product Image ${index + 1}`} 
                                    onError={(e) => e.target.src = 'https://example.com/default-placeholder.jpg'} // Fallback image
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt="" />
                    </div>
                </div>
                {/*------product-info-------*/}
                <div className='flex-1'>
                      <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
                      <div className='flex items-center gap-1 mt-2'>
                          <img src={assets.star_icon} alt="" className="w-3 5" />
                          <img src={assets.star_icon} alt="" className="w-3 5" />
                          <img src={assets.star_icon} alt="" className="w-3 5" />
                          <img src={assets.star_icon} alt="" className="w-3 5" />
                          <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                          <p className='pl-2'>(122)</p>
                      </div>
                        <p className='mt-5 text-3xl font-medium'>
                          {currency}{productData.price}
                        </p>
                        <p className='mt-5 text-gray-500 md:w-4/5'>  
                          {productData.description}
                        </p>
                        <div className='flex flex-col gap-4 my-8'>
                          <p>Select Size</p>
                          <div className='flex gap-2'>
                            {productData.sizes.map((item,index)=>(
                              <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                            ))}
                          </div>
                        </div>
                        <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                            <hr className='mt-8 sm:w-4/5'/>
                            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                                <p>100% Original Product.</p>
                                <p>Cash on delivery is available on this product.</p>
                                <p>Easy return and exchange policy in 7 days.</p>
                            </div>
                        </div>
                </div>

        {/*--------description & review section---------------*/}

        <div className='mt-20'>
          <div className='flex '>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum molestiae, dolorum, libero est provident magnam quos ratione dolores doloremque mollitia consequuntur perferendis quia perspiciatis doloribus aperiam, tempora minima numquam. Officiis!</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laudantium quo debitis, vel suscipit dolorem libero nisi eligendi saepe quod fuga obcaecati praesentium maxime nam quas esse delectus unde voluptatibus!</p>
          </div>
        </div>

        {/*---------------display related product------------------*/}

        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

        </div>
    ) : <div className='opacity-0'></div>;
};

export default Product;

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../CartSlice';  // Import Redux action
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// const Product = () => {
//     const { productId } = useParams();
//     const { Products, currency } = useContext(ShopContext);
//     const [productData, setProductData] = useState(null);
//     const [image, setImage] = useState('');
//     const [size, setSize] = useState('');
//     const dispatch = useDispatch();  // Initialize Redux dispatch
//     const navigate = navigate();  // Initialize navigation
      
//         const handleAddToCart = () => {
//           dispatch(addToCart(Products));  // Add product to cart
//           navigate('/cart');  // Redirect to Cart page
//         }


//     useEffect(() => {
//         if (Products && Array.isArray(Products) && Products.length > 0) {
//             const foundProduct = Products.find(item => String(item._id) === productId);
//             if (foundProduct) {
//                 setProductData(foundProduct);
//                 setImage(foundProduct.image?.[0] || 'https://example.com/default-placeholder.jpg');
//             }
//         }
//     }, [Products, productId]);

//     return productData ? (
//         <div className='border-t-2 pt-10'>
//             {/* Product Info */}
//             <div className='flex gap-12 flex-col sm:flex-row'>
//                 {/* Image Section */}
//                 <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//                     <div className='flex sm:flex-col overflow-x-hidden sm:overflow-y-scroll'>
//                         {productData.image?.map((item, index) => (
//                             <img key={index} src={item} alt={`Product Image ${index + 1}`}
//                                 className={`cursor-pointer ${item === image ? 'border-orange-500' : ''}`}
//                                 onClick={() => setImage(item)} />
//                         ))}
//                     </div>
//                     <div className='w-full sm:w-[80%]'>
//                         <img className='w-full h-auto' src={image} alt={productData.name} />
//                     </div>
//                 </div>

//                 {/* Product Details */}
//                 <div className='flex-1'>
//                     <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//                     <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//                     <p className='mt-5 text-gray-500'>{productData.description}</p>

//                     {/* Size Selection */}
//                     <div className='flex flex-col gap-4 my-8'>
//                         <p>Select Size</p>
//                         <div className='flex gap-2'>
//                             {productData.sizes.map((item, index) => (
//                                 <button key={index} className={`border py-2 px-4 ${item === size ? 'border-orange-500' : ''}`}
//                                     onClick={() => setSize(item)}>{item}</button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <button 
//                         className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
//                         onClick={() => dispatch(addToCart({ ...productData, selectedSize: size }))}>
//                         ADD TO CART
//                     </button>
//                 </div>
//             </div>

//             {/* Related Products */}
//             <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//         </div>
//     ) : <div className='opacity-0'></div>;
// };

// export default Product;


