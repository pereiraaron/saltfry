import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface RatingProps {
  stars: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ stars, reviews }) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <span className="text-[#ffb900] text-base mr-1">
          {stars >= 1 ? <BsStarFill /> : stars >= 0.5 ? <BsStarHalf /> : <BsStar />}
        </span>
        <span className="text-[#ffb900] text-base mr-1">
          {stars >= 2 ? <BsStarFill /> : stars >= 1.5 ? <BsStarHalf /> : <BsStar />}
        </span>
        <span className="text-[#ffb900] text-base mr-1">
          {stars >= 3 ? <BsStarFill /> : stars >= 2.5 ? <BsStarHalf /> : <BsStar />}
        </span>
        <span className="text-[#ffb900] text-base mr-1">
          {stars >= 4 ? <BsStarFill /> : stars >= 3.5 ? <BsStarHalf /> : <BsStar />}
        </span>
        <span className="text-[#ffb900] text-base mr-1">
          {stars >= 5 ? <BsStarFill /> : stars >= 4.5 ? <BsStarHalf /> : <BsStar />}
        </span>
      </div>
      <p className="ml-2 mb-0!">({reviews} customer reviews)</p>
    </div>
  );
};

export default Rating;
