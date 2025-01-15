import React, { useContext } from 'react';
import { shopContext } from '../context/shopContext';
import {Link} from 'react-router-dom';
const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(shopContext);

  return (
    <Link  className='text-gray-700 'to={`/product/${id}`}>
    <div className="overflow-hidden">
      <img
        className="hover:scale-110 transition ease-in-out"
        src={image || "/default-placeholder.png"} // Use placeholder if image is missing
        alt={name || "Product image"}
      />
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{currency}{price}</p>
    </div>
    </Link>
  );
};

export default ProductItem;
