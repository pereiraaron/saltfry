import React, { useEffect, useState } from 'react';
import { ProductImage } from '@types';

interface ProductImagesProps {
  images?: ProductImage[];
  name?: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images = [], name = 'Product' }) => {
  const [main, setMain] = useState<ProductImage | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      setMain(images[0]);
    }
  }, [images]);

  return (
    <div>
      {main && (
        <img
          src={main.url}
          alt={name}
          className="h-150 w-full block rounded-default object-cover"
        />
      )}
      <div className="mt-4 grid grid-cols-5 gap-x-4">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={`${name} view ${index + 1}`}
              key={index}
              className={`w-full block rounded-default object-cover h-25 cursor-pointer ${
                image.url === main?.url ? 'border-2 border-primary-5' : ''
              }`}
              onClick={() => setMain(images[index])}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;
