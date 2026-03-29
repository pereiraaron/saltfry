import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="py-16">
      <div className="section-center grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="h-52 bg-grey-9" />
            <div className="px-4 py-4 flex justify-between items-center">
              <div className="h-4 w-28 rounded-full bg-grey-9" />
              <div className="h-4 w-16 rounded-full bg-grey-9" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
