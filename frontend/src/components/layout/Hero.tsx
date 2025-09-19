import { heroImg } from '@/assets'


function Hero() {
  return (
    <section className="relative ">
      <img
        src={heroImg}
        alt="hero"
        className="w-full h-[400px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
            Vacation Here
          </h1>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-8 max-w-2xl mx-auto">
            Discover amazing destinations and create unforgettable memories
          </p>
          <button className="bg-white text-black px-8 py-3 sm:px-10 sm:py-4 text-lg font-semibold rounded-lg hover:bg-white/90 transition-colors duration-300">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero