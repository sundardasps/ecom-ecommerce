import axios from "axios";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function NewArrivels() {
  const scrollRef = useRef<any>(null);
  const [isDragging, setISDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [newArrivels, setnewArrivels] = useState([]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setISDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft); // ✅ fixed
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  useEffect(() => {
    const fetchNewArrivels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivels`
        );
        setnewArrivels(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewArrivels();
  }, []);

  const handleMouseUpOrLeave = () => {
    setISDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // ✅ prevents unwanted image selection
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: "right" | "left") => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(leftScroll > 0);

      // ✅ Tolerance of 2px for rounding issues
      setCanScrollRight(leftScroll < maxScrollLeft - 2);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons); // ✅ fixed addEventListner → addEventListener
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivels]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10  relative">
        {/* ✅ fixed typo: text-ceneter → text-center */}
        <h2 className="text-3xl font-bold mb-3">Explore New Arrivels</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest straight off the runway, freshly added to keep
          your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0  bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Products */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative scroll-smooth select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {newArrivels.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.alt}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
              </Link>
              <p className="mt-1">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivels;
