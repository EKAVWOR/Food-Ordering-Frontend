// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { ShoppingCart, Home, Menu, Search, User } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [search, setSearch] = useState("");

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-orange-600 text-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          🍽️ TasteWithBecca
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-6 flex-wrap justify-end">
          {/* Nav Links */}
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
            >
              <Home size={20} /> <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/menu"
              className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
            >
              <Menu size={20} /> <span className="hidden sm:inline">Menu</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
            >
              <ShoppingCart size={22} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
            >
              <User size={20} /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center overflow-hidden rounded-full border border-orange-200 bg-white">
            <input
              type="text"
              placeholder="Search meals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 pl-4 text-black outline-none w-64"
            />
            <button className="p-3 bg-orange-700 hover:bg-orange-800 transition-colors duration-200">
              <Search size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
