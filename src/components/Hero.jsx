// // src/components/Hero.jsx

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import hero from "../assets/Heroimage.png";
// import person from "../assets/heroperson.png";


// const Hero = () => {
//   return (
//     <div className="relative">
//       <section className="flex flex-col md:flex-row mx-3 my-10">
//       <div className="md:w-[50%] py-10 px-5 my-auto ">
//         <p>Order Restaurant food, takeaway and Noodles</p>
//         <h1 className="text-5xl font-bold">Feast Your Senses, <span className="text-orange-500">Fast and Fresh</span></h1>
//         <div className="my-10">
//           <p className="text-sm">Enter a postcode to see what we deliver</p>
//           <div className="relative">
//             <input
//               type="email"
//               placeholder="e.g. EC4R 3TE"
//               className="bg-white w-50 text-[12px] pl-3 pr-24 py-2 mt-3 border border-orange-700 rounded-2xl text-black"
//             />
//             <button className="text-[12px] bg-orange-400 rounded-2xl py-2 px-4 absolute left-40 mt-3">
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="md:w-[50%]">
//         <img src={hero} alt="" />
//       </div>
//     </section>
//     <div className="absolute top-41 left-70 mx-auto  hidden md:block">
//       <img className="w-150" src={person} alt="" />
//     </div>
//     </div>
    
    
//   );
// };

// export default Hero;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../assets/Heroimage.png";
import person1 from "../assets/heroperson.png";
import hero2 from "../assets/Heroimage.png"; // Or use a different image
import person2 from "../assets/heroperson.png"; // Or use a different image

const slides = [
  {
    hero: hero1,
    person: person1,
    bg: "bg-white", // First slide background
    title: (
      <>
        Feast Your Senses, <span className="text-orange-500">Fast and Fresh</span>
      </>
    ),
    subtitle: "Order Restaurant food, takeaway and Noodles",
    prompt: "Enter a postcode to see what we deliver",
    inputType: "text",
    inputPlaceholder: "e.g. EC4R 3TE",
  },
  {
    hero: hero2,
    person: person2,
    bg: "bg-orange-500", // Second slide background
    title: (
      <>
        Discover <span className="text-white">New Flavors</span> Near You
      </>
    ),
    subtitle: "Find the best local eats and hidden gems",
    prompt: "Type your area to explore restaurants",
    inputType: "text",
    inputPlaceholder: "e.g. SW1A 1AA",
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 600 : -600,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 600 : -600,
    opacity: 0,
  }),
};

const Hero = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Auto-slide effect
  useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [page]);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => {
      let nextPage = prevPage + newDirection;
      if (nextPage < 0) nextPage = slides.length - 1;
      if (nextPage >= slides.length) nextPage = 0;
      return [nextPage, newDirection];
    });
  };

  const slide = slides[page];

  return (
    <div className="relative">
      <section className={`flex flex-col md:flex-row mx-3 my-10 rounded-2xl overflow-hidden transition-colors duration-500 ${slide.bg}`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
            className="flex flex-col md:flex-row w-full"
          >
            <div className="md:w-[50%] py-10 px-5 my-auto">
              <p className={page === 1 ? "text-white" : ""}>{slide.subtitle}</p>
              <h1 className={`text-5xl font-bold ${page === 1 ? "text-white" : ""}`}>{slide.title}</h1>
              <div className="my-10">
                <p className={`text-sm ${page === 1 ? "text-white" : ""}`}>{slide.prompt}</p>
                <div className="relative">
                  <input
                    type={slide.inputType}
                    placeholder={slide.inputPlaceholder}
                    className="bg-white w-50 text-[12px] pl-3 pr-24 py-2 mt-3 border border-orange-700 rounded-2xl text-black"
                  />
                  <button className="text-[12px] bg-orange-400 rounded-2xl py-2 px-4 absolute left-40 mt-3">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-[50%] relative">
              <img src={slide.hero} alt="" />
              <div className="absolute w-150 top-41 right-90  hidden md:block">
                <img className=" w-full" src={slide.person} alt="" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      {/* Carousel Controls */}
      <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-4 z-10">
        <button
          onClick={() => paginate(-1)}
          className="bg-white/80 hover:bg-white text-orange-500 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow"
          aria-label="Previous"
        >
          &#8592;
        </button>
        <button
          onClick={() => paginate(1)}
          className="bg-white/80 hover:bg-white text-orange-500 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
      {/* Dots */}
      <div className="absolute left-0 right-0 bottom-0 flex justify-center gap-2 pb-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-3 h-3 rounded-full ${
              idx === page ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;