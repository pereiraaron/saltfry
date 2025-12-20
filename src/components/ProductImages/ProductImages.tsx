import React, { useEffect, useState } from 'react';
import './ProductImages.css';
import { ProductImage } from '../../types';

interface ProductImagesProps {
  images?: ProductImage[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images = [] }) => {
  const [main, setMain] = useState<ProductImage | $TSFixMe>({});

  useEffect(() => {
    if (images.length > 0) {
      setMain(images[0]);
    }
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
              className={`${image.url === main.url ? 'active' : ''}`}
              onClick={() => setMain(images[index])}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;

