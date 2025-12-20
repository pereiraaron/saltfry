import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyFilters } from '../../actions/productScreenActions';
import GridView from '../GridView/GridView';
import ListView from '../ListView/ListView';
import Loading from '../Loading/Loading';

const ProductList = ({ products, loading }) => {
  const dispatch = useDispatch();

  const productScreen = useSelector((state) => state.productScreen);
  const { filteredProducts, gridView, filters } = productScreen;

  useEffect(() => {
    if (filteredProducts) {
      dispatch(applyFilters(filters, products));
    }
  }, [filters, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : filteredProducts.length < 1 ? (
        <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search.</h5>
      ) : gridView === true ? (
        <GridView products={filteredProducts} />
      ) : (
        <ListView products={filteredProducts} />
      )}
    </>
  );
};

export default ProductList;
