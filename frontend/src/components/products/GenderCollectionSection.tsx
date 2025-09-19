import { mansCollection, womansCollection } from "@/assets";

function GenderCollectionSection() {
  const collections = [
    {
      title: "Men's Collection",
      img: mansCollection,
      link: "/collections/men",
    },
    {
      title: "Women's Collection",
      img: womansCollection,
      link: "/collections/women",
    },
  ];

  return (
    <section className="px-4 py-10 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Shop by Gender
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {collections.map((col) => (
          <a
            key={col.title}
            href={col.link}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <img
              src={col.img}
              alt={col.title}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                {col.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default GenderCollectionSection;
