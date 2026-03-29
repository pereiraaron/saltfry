import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface RatingProps {
  stars: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ stars, reviews }) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="text-amber-400 text-base">
            {stars >= i ? <BsStarFill /> : stars >= i - 0.5 ? <BsStarHalf /> : <BsStar />}
          </span>
        ))}
      </div>
      <p className="text-grey-5 text-sm mb-0">({reviews} reviews)</p>
    </div>
  );
};

export default Rating;
