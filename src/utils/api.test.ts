import { describe, it, expect } from 'vitest';
import { normalizeApiProduct, ApiProduct } from './api';

const makeApiProduct = (overrides?: Partial<ApiProduct>): ApiProduct => ({
  id: 42,
  attributes: {
    title: 'Modern Table',
    company: 'Woodcraft',
    description: 'A fine table',
    featured: true,
    category: 'office',
    image: 'https://example.com/table.jpg',
    price: '29999',
    shipping: true,
    colors: ['#000', '#fff'],
  },
  ...overrides,
});

describe('normalizeApiProduct', () => {
  it('converts id from number to string', () => {
    const result = normalizeApiProduct(makeApiProduct());
    expect(result.id).toBe('42');
  });

  it('converts price from string to number', () => {
    const result = normalizeApiProduct(makeApiProduct());
    expect(result.price).toBe(29999);
  });

  it('maps all attributes correctly', () => {
    const result = normalizeApiProduct(makeApiProduct());
    expect(result).toEqual({
      id: '42',
      name: 'Modern Table',
      price: 29999,
      image: 'https://example.com/table.jpg',
      colors: ['#000', '#fff'],
      company: 'Woodcraft',
      description: 'A fine table',
      category: 'office',
      shipping: true,
      featured: true,
    });
  });
});
