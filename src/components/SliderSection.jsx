// src/components/SliderSection.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// ✅ Import all 6 images
import meal1 from "../assets/3a9e7dca4f5b308ea600ec8308b0a6fd.jpg";
import meal2 from "../assets/3cd450fe5e0a2c07d00ebc38ec811576.jpg";
import meal3 from "../assets/41ab5644c4b4845fc2c9d00a947cb84c.jpg";
import meal4 from "../assets/41d6550e96ee3c1cad6b3f88949500bc.jpg";
import meal5 from "../assets/685008bdcd0e3f1e4c8a80d8a93e5c97.jpg";
import meal6 from "../assets/ace1309df3647bd066b9890809d4bc4d.jpg";

const mealImages = [meal1, meal2, meal3, meal4, meal5, meal6];

const SliderSection = () => {
  return (
    <section className="bg-orange-50 ">
      <div className="container mx-auto ">
        {/* <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-orange-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.01 }}
        >
          Featured Meals
        </motion.h2> */}

        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade" // ✅ fade effect like a video crossfade
          loop={true}
          speed={2000} // ✅ slow smooth fade speed
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className=" overflow-hidden"
        >
          {mealImages.map((img, index) => (
            <SwiperSlide key={index}>
              <motion.img
                src={img}
                alt={`Meal ${index + 1}`}
                className="w-full h-96 md:h-[500px] object-cover shadow-2xl"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Link to="/menu">
          <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-xl shadow-lg"
          >
            Our Delicious Packs
          </motion.button>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .swiper-slide {
          transition: transform 1s ease, opacity 1s ease;
        }
        .swiper-slide:not(.swiper-slide-active) img {
          filter: blur(2px) brightness(0.8);
          transform: scale(0.95);
        }
      `}</style>
    </section>
  );
};

export default SliderSection;
