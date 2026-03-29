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
          loading="eager"
          decoding="async"
          className="h-72 sm:h-96 lg:h-150 w-full block rounded-xl object-cover shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        />
      )}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={`${name} view ${index + 1}`}
              key={index}
              loading="lazy"
              decoding="async"
              className={`w-full block rounded-lg object-cover h-25 cursor-pointer transition-all duration-200 ${
                image.url === main?.url
                  ? 'ring-2 ring-primary-5 ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
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
