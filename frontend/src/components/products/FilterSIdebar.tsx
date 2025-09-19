import { BRANDS, CATEGORY, COLORS, GENDERS, MATERIALS, SIZES } from "@/data";
import { useEffect, useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { filterTypes } from "types/product";
import { Input } from "../ui/input";

function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<filterTypes>({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice ? Number(params.minPrice) : 0,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : 100,
    });

    setPriceRange([
      params.minPrice ? Number(params.minPrice) : 0,
      params.maxPrice ? Number(params.maxPrice) : 100,
    ]);
  }, [searchParams]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLButtonElement;
    const { name, value, type, checked } = target;

    let newFilter: filterTypes = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilter[name as keyof filterTypes] = [
          ...(newFilter[name as keyof filterTypes] as string[]),
          value,
        ] as any;
      } else {
        newFilter[name as keyof filterTypes] = (
          newFilter[name as keyof filterTypes] as string[]
        ).filter((item) => item !== value) as any;
      }
    } else {
      newFilter[name as keyof filterTypes] = value as any;
    }

    setFilters(newFilter);
    updateURLParams(newFilter);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);

    const newFilters: filterTypes = {
      ...filters,
      minPrice: 0,
      maxPrice: newPrice,
    };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters: filterTypes) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      const val = newFilters[key as keyof filterTypes];
      if (Array.isArray(val) && val.length > 0) {
        params.append(key, val.join(","));
      } else if (val !== "" && val !== 0) {
        params.append(key, String(val));
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="p-4 ">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6 ">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {CATEGORY.map((item) => (
          <div className="flex items-center mb-1" key={item}>
            <Input
              type="radio"
              name="category"
              value={item}
              checked={filters.category === item}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-blue-300"
            />
            <span className="text-gray-700 capitalize">{item}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6 ">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {GENDERS.map((item) => (
          <div className="flex items-center mb-1" key={item}>
            <Input
              type="radio"
              name="gender"
              value={item}
              checked={filters.gender === item}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-blue-300"
            />
            <span className="text-gray-700 capitalize">{item}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6 ">
        <label className="block text-gray-600 font-medium mb-2 ">Color</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((item) => (
            <button
              key={item}
              name="color"
              value={item}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === item ? "ring-2 ring-blue-500" : ""
              } `}
              style={{ backgroundColor: item.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 ">Size</label>
        <div className="flex flex-col gap-2">
          {SIZES.map((item) => (
            <div className="flex items-center mb-1" key={item}>
              <Input
                type="checkbox"
                name="size"
                value={item}
                checked={filters.size.includes(item)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-blue-300"
              />
              <span className="text-gray-700 capitalize">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 ">
          Material
        </label>
        <div className="flex flex-col gap-2">
          {MATERIALS.map((item) => (
            <div className="flex items-center mb-1" key={item}>
              <Input
                type="checkbox"
                name="material"
                value={item}
                checked={filters.material.includes(item)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-blue-300"
              />
              <span className="text-gray-700 capitalize">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 ">Brand</label>
        <div className="flex flex-col gap-2">
          {BRANDS.map((item) => (
            <div className="flex items-center mb-1" key={item}>
              <Input
                type="checkbox"
                name="brand"
                value={item}
                checked={filters.brand.includes(item)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-blue-300"
              />
              <span className="text-gray-700 capitalize">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2 ">
          Price Range
        </label>
        <Input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer "
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
