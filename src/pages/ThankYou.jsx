import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const ThankYou = () => {
  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <Navbar />

      <main className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center bg-white/80 backdrop-blur-md p-12 rounded-xl shadow-xl max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-yellow-900 mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-yellow-800">
            Your registration has been received. We look forward to seeing you at the program!
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
