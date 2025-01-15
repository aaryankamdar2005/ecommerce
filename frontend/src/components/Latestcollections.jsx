import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/shopContext.jsx';
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const LatestCollections = () => {
  const { products } = useContext(shopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Slice the first 10 products

    setLatestProducts(products.slice(0, 10));
    console.log(products);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center my-10 text-3xl">
        <Title text1={"Latest"} text2={"Collection"} />
        <p className="w-3/4 m-auto text-xs sm:text-base text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur laborum vel veritatis! Ad velit
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image?.[0]} // Safely access the first image
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
