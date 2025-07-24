// src/components/CallToAction.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="flex justify-center my-12">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Link
          to="/menu"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 px-10 rounded-full text-xl shadow-lg transition-transform duration-300"
        >
          Our Delicious Packs
        </Link>
      </motion.div>
    </div>
  );
};

export default CallToAction;
