import { featured } from "@/assets";
import { Link } from "react-router-dom";

function FeaturedCollections() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex  flex-col-reverse lg:flex-row  items-center bg-green-50 rounded-lg">
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold  text-gray-700 mb-2">
            Confort And Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 ">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-green-600 mb-6">
            Discover high-quality, comforable clothing that effortlessly blends
            fashon and function. Designed to make look and great every day.
          </p>
          <Link
            to={`/collections/all`}
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-green-800"
          >
            Shop Now
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured collection"
            className="w-full h-full object-cover lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollections;
