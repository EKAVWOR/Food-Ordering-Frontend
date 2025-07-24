import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MealCard from "../components/MealCard";

// ✅ Dummy meals data
const meals = [
  {
    id: 1,
    name: "Spicy Spagetti",
    description: "Smoky party spagetti with grilled chicken and veggies.",
    price: 2000,
    image: "src/assets/meal1.png",
  },
  {
    id: 2,
    name: "Egg Spagetti",
    description: "Rich Spagetti with Egg and assorted veggies.",
    price: 3000,
    image: "src/assets/meal2.png",
  },
  {
    id: 3,
    name: "Jollof Rice and Chicken",
    description: "Sweet Jollof Rice And fried Chicken to golden perfection.",
    price: 5000,
    image: "src/assets/meal3.png",
  },
  {
    id: 4,
    name: "Fried Rice and Chicken",
    description: "Hot spiced Fried Rice and Golden Fried Chicken ",
    price: 6000,
    image: "src/assets/meal4.png",
  },
  {
    id: 5,
    name: "Assorted Spaghetti",
    description: "Delicious spinach Spaghetti with assorted Ingreients.",
    price: 5000,
    image: "src/assets/meal5.png",
  },
  {
    id: 6,
    name: "Ofada Rice",
    description: "Local ofada rice served with Salad and Chicken.",
    price: 5000,
    image: "src/assets/meal6.png",
  },
];

const Menu = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="flex flex-col  min-h-screen bg-orange-50">
      <Navbar />

      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold py-7 text-center text-orange-700 mb-8">
          Our Delicious Packs
        </h1>

        <div className="grid grid-cols-1 md:mx-20  sm:grid-cols-2 md:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <MealCard className="shadow-2xl" key={meal.id} meal={meal} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
