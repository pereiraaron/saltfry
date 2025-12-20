import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters } from '../../actions/productScreenActions';
import GridView from '../GridView/GridView';
import ListView from '../ListView/ListView';
import Loading from '../Loading/Loading';
import { RootState, Product } from '../../types';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  const dispatch = useDispatch();

  const productScreen = useSelector((state: RootState) => state.productScreen);
  const { filteredProducts, gridView, filters } = productScreen;

  useEffect(() => {
    if (filteredProducts) {
      dispatch(applyFilters(filters, products) as $TSFixMe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (filteredProducts.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search.</h5>;
  }

  if (gridView === true) {
    return <GridView products={filteredProducts} />;
  }

  return <ListView products={filteredProducts} />;
};

export default ProductList;
