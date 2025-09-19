import Hero from "@/components/layout/Hero";
import FeaturedCollections from "@/components/products/FeaturedCollections";
import FeaturesSection from "@/components/products/FeaturesSection";
import GenderCollectionSection from "@/components/products/GenderCollectionSection";
import NewArrivals from "@/components/products/NewArrivels";
import ProductDetails from "@/components/products/ProductDetails";
import ProductGrid from "@/components/products/ProductGrid";
import { fetchProcutsByFilters } from "@/redux/slice/productSlic";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  const [bestSellerProduct, setbestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProcutsByFilters({
        grnder: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setbestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);





  return (
    <>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/*Best seller section*/}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller products....</p>
      )}
      <div className="container mx-auto ">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears For Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
        <FeaturedCollections />
        <FeaturesSection />
      </div>
    </>
  );
}

export default Home;
