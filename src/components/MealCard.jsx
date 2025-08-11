const MealCard = ({ meal, addToCart }) => {
  // This is the correct dynamic URL:
  const imageURL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEDURL}/${meal.image.replace(/\\/g, "/")}`;

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between">
      <img
        src={imageURL}
        alt={meal.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{meal.name}</h2>
      <p className="text-gray-600 mb-2">{meal.description}</p>
      <p className="font-bold text-orange-700 mb-4">
        ₦{Number(meal.price).toFixed(2)}
      </p>
      <button
        onClick={() => addToCart(meal)}
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MealCard;
