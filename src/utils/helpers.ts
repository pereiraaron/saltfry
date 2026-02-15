import { Product } from '../types';

export const formatPrice = (number: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data: Product[], type: keyof Product): string[] => {
  let unique: unknown[] = data.map((item) => item[type]);
  if (type === 'colors') {
    unique = unique.flat();
  }

  return ['all', ...new Set(unique as string[])];
};

export const handleIncrement = (currentqty: number, total: number): number => {
  if (currentqty + 1 <= total) {
    return currentqty + 1;
  }
  return currentqty;
};

export const handleDecrement = (currentqty: number): number => {
  if (currentqty <= 1) {
    return currentqty;
  }
  return currentqty - 1;
};
