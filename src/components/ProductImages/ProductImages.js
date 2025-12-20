import React, { useEffect, useState } from 'react';
import './ProductImages.css';

const ProductImages = ({ images = [[]] }) => {
  const [main, setMain] = useState({});

  useEffect(() => {
    setMain(images[0]);
  }, [images]);

  return (
    <div className="product-images">
      <img src={main.url} alt="" className="main" />
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt=""
              key={index}
              className={`${image.url === main.url ? 'active' : null}`}
              onClick={() => setMain(images[index])}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;
