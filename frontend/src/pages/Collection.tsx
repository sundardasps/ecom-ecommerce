import React, { useEffect, useRef, useState } from "react";
import type { Product } from "types/product";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "@/components/products/FilterSidebar";
import SortOptions from "@/components/products/SortOptions";
import ProductGrid from "@/components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProcutsByFilters } from "@/redux/slice/productSlic";

function Collection() {
  const { collectios } = useParams();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);

  const queryParams = Object.fromEntries([...searchParams]);

 
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProcutsByFilters({ collectios, ...queryParams }));
  }, [dispatch, Collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Mobile filter button */}
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center z-50 bg-white"
      >
        <FaFilter className="mr-2" /> Filter
      </button>

      {/* Backdrop (only mobile) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        <SortOptions />
       {
        products.length > 0 ? (  <ProductGrid products={products} error={error} loading={loading}/>):(<p className="text-center"> No Products found..</p>)
       }
      </div>
    </div>
  );
}

export default Collection;
