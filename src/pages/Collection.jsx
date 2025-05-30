import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';

const Collection = () => {
  // Access Products from context
  const { Products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle category logic
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle sub-category logic
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Initialize filterProducts state with Products from context
  useEffect(() => {
    if (Products && Products.length > 0) {
      setFilterProducts(Products);
    } else {
      console.warn('Products are undefined or empty.');
    }
  }, [Products]);

  // Sorting function
  const sortProduct = (filteredProducts) => {
    let sortedProducts = [...filteredProducts];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(sortedProducts);
  };

  // Apply filters and sorting
  const applyFilter = () => {
    if (!Products || Products.length === 0) {
      console.warn('No products available to filter.');
      setFilterProducts([]);
      return;
    }

    // Apply search filter first
    let productsCopy = showSearch && search
      ? Products.filter(item => item.name.toLowerCase().includes(search?.toLowerCase().trim()))
      : [...Products];

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply sorting
    sortProduct(productsCopy);
  };

  // Ensure filters are applied whenever relevant states change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, search, showSearch, Products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden cursor-pointer ${showFilter ? 'rotate-90' : ''}`}
            src={assets?.dropdown_icon || '/default-icon.png'}
            alt="Dropdown Icon"
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Clock', 'Covers', 'Frames'].map((item) => (
              <p key={item} className="flex gap-2">
                <input className="w-3" type="checkbox" value={item} onChange={toggleCategory} />
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Pandents', 'Earings', 'Rings'].map((item) => (
              <p key={item} className="flex gap-2">
                <input className="w-3" type="checkbox" value={item} onChange={toggleSubCategory} />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <Productitem key={item._id || index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
