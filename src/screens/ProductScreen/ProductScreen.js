import React, { useEffect } from "react";
import "./ProductScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProductDetails } from "../../actions/productActions";
import PageHero from "../../components/PageHero/PageHero";
import { formatPrice } from "../../utils/helpers";
import ProductImages from "../../components/ProductImages/ProductImages";
import Loading from "../../components/Loading/Loading";
import Rating from "../../components/Rating/Rating";
import AddToCart from "../../components/AddToCart/AddToCart";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const {
    name,
    price,
    description,
    stock,
    id,
    company,
    images,
    stars,
    reviews,
  } = product;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  return loading ? (
    <Loading />
  ) : error ? (
    "Error"
  ) : (
    <main>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Rating stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {id}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductScreen;
