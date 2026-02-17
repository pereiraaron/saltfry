import { describe, it, expect } from 'vitest';
import { Product } from '@types';
import { formatPrice, getUniqueValues, handleIncrement, handleDecrement } from './helpers';

describe('formatPrice', () => {
  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats cents to dollars', () => {
    expect(formatPrice(1099)).toBe('$10.99');
  });

  it('formats large amounts with comma separator', () => {
    expect(formatPrice(100000)).toBe('$1,000.00');
  });

  it('formats single cent', () => {
    expect(formatPrice(1)).toBe('$0.01');
  });

  it('formats negative values', () => {
    expect(formatPrice(-500)).toBe('-$5.00');
  });
});

const makeProduct = (overrides: Partial<Product>): Product => ({
  id: '1',
  name: 'Test',
  price: 1000,
  image: 'img.jpg',
  colors: ['#000'],
  company: 'TestCo',
  description: 'desc',
  category: 'office',
  ...overrides,
});

describe('getUniqueValues', () => {
  it('returns ["all"] for empty array', () => {
    expect(getUniqueValues([], 'category')).toEqual(['all']);
  });

  it('extracts unique categories and prepends "all"', () => {
    const products = [
      makeProduct({ category: 'office' }),
      makeProduct({ category: 'living room' }),
      makeProduct({ category: 'office' }),
    ];
    expect(getUniqueValues(products, 'category')).toEqual(['all', 'office', 'living room']);
  });

  it('flattens and deduplicates colors', () => {
    const products = [
      makeProduct({ colors: ['#000', '#fff'] }),
      makeProduct({ colors: ['#fff', '#f00'] }),
    ];
    expect(getUniqueValues(products, 'colors')).toEqual(['all', '#000', '#fff', '#f00']);
  });

  it('extracts unique companies', () => {
    const products = [makeProduct({ company: 'A' }), makeProduct({ company: 'B' })];
    expect(getUniqueValues(products, 'company')).toEqual(['all', 'A', 'B']);
  });
});

describe('handleIncrement', () => {
  it('increments when below stock', () => {
    expect(handleIncrement(3, 10)).toBe(4);
  });

  it('does not increment when at stock limit', () => {
    expect(handleIncrement(10, 10)).toBe(10);
  });

  it('does not increment when above stock limit', () => {
    expect(handleIncrement(11, 10)).toBe(11);
  });
});

describe('handleDecrement', () => {
  it('decrements when above 1', () => {
    expect(handleDecrement(5)).toBe(4);
  });

  it('does not decrement below 1', () => {
    expect(handleDecrement(1)).toBe(1);
  });

  it('does not decrement when already 0', () => {
    expect(handleDecrement(0)).toBe(0);
  });
});
