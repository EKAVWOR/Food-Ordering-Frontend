// src/components/SliderSection.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// ✅ Import all 6 meal images from assets
import meal1 from "../assets/3a9e7dca4f5b308ea600ec8308b0a6fd.jpg";
import meal2 from "../assets/3cd450fe5e0a2c07d00ebc38ec811576.jpg";
import meal3 from "../assets/41ab5644c4b4845fc2c9d00a947cb84c.jpg";
import meal4 from "../assets/41d6550e96ee3c1cad6b3f88949500bc.jpg";
import meal5 from "../assets/685008bdcd0e3f1e4c8a80d8a93e5c97.jpg";
import meal6 from "../assets/ace1309df3647bd066b9890809d4bc4d.jpg";

// ✅ Put all images in the array
const mealImages = [meal1, meal2, meal3, meal4, meal5, meal6];

const Swipe = () => {
  return (
    <section className="bg-orange-50 py-12">
      <div className="container mx-auto px-4">
    

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={3} // You can change this if you want to show more
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {mealImages.map((img, index) => (
            <SwiperSlide key={index}>
              <motion.img
                src={img}
                alt={`Meal ${index + 1}`}
                className="rounded-xl w-full h-64 object-cover shadow-lg"
                whileHover={{ scale: 1.05 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      
      </div>
    </section>
  );
};

export default Swipe;
