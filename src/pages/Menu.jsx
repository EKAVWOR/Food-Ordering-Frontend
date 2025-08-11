// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "../context/CartContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import MealCard from "../components/MealCard";

// const Menu = () => {
//   const { addToCart } = useContext(CartContext);

//   const [meals, setMeals] = useState([]);

//   // ✅ Fetch meals from your backend when page loads
//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/meals");
//         const data = await res.json();
//         setMeals(data.meals); // Make sure your backend returns { meals: [...] }
//       } catch (err) {
//         console.error("Failed to fetch meals:", err);
//       }
//     };

//     fetchMeals();
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen bg-orange-50">
//       <Navbar />

//       <main className="flex-grow container mx-auto p-8">
//         <h1 className="text-4xl md:text-5xl font-extrabold py-7 text-center text-orange-700 mb-8">
//           Our Delicious Packs
//         </h1>

//         <div className="grid grid-cols-1 md:mx-20 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {meals.length > 0 ? (
//             meals.map((meal) => (
//               <MealCard
//                 key={meal._id}
//                 meal={{
//                   id: meal._id,
//                   name: meal.name,
//                   description: meal.description,
//                   price: meal.price,
//                   image: meal.image, // Must be valid URL!
//                 }}
//                 addToCart={addToCart}
//               />
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-3">
//               No meals available. Please check back later.
//             </p>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Menu;

// src/pages/Menu.jsx

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MealCard from "../components/MealCard";

const Menu = () => {
  const { addToCart } = useContext(CartContext);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEDURL}/api/meals`);
        const data = await res.json();
        setMeals(data.meals); // adjust according to your backend response
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />

      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold py-7 text-center text-orange-700 mb-8">
          Our Delicious Packs
        </h1>

        <div className="grid grid-cols-1 md:mx-20 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={{...meal, id: meal._id}}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="text-center w-full text-gray-600">
              No meals available yet. Please check back later.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
