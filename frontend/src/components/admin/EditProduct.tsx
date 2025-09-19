import React, { useState, type ChangeEvent } from "react";

interface ProductImage {
  url: string;
  alt: string;
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  countInStock: number;
  sku: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  collections: string;
  materials: string;
  gender: string;
  images: ProductImage[];
}

function EditProduct() {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    description: "",
    price: "",
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    materials: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        alt: "Product 1 Image",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        alt: "Product 2 Image",
      },
    ],
  });

  // ✅ typed handleChange
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ typed handleImageUpload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: imageUrl, alt: file.name }],
      }));
    }
  };


  const handleSubmit = (e) =>{
    e.preventDefault()
    
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Products</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}www
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            rows={4}
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            name="price"
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            name="countInStock"
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            value={productData.countInStock}
            onChange={handleChange}
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            name="sku"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            value={productData.sku}
            onChange={handleChange}
          />
        </div>
        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            name="sizes"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
          />
        </div>
        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            name="colors"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((c) => c.trim()),
              })
            }
          />
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        {/* Image Preview */}
        <div className="flex gap-4 flex-wrap mb-6">
          {productData.images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.alt}
              className="w-24 h-24 object-cover rounded-md border"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
