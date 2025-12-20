export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === 'colors') {
    unique = unique.flat();
  }

  return ['all', ...new Set(unique)];
};

export const handleIncrement = (currentqty, total) => {
  if (currentqty + 1 <= total) {
    return currentqty + 1;
  } else {
    return currentqty;
  }
};

export const handleDecrement = (currentqty) => {
  if (currentqty <= 1) {
    return currentqty;
  } else {
    return currentqty - 1;
  }
};
