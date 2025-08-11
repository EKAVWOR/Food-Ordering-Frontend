// // src/components/Navbar.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart, Home, Menu, Search, User, LogOut } from "lucide-react";
// import { useContext, useState } from "react";
// import { CartContext } from "../context/CartContext";

// const Navbar = () => {
//   const { cartItems } = useContext(CartContext);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   // ✅ Dashboard click handler
//   const handleDashboardClick = () => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (!token) {
//       navigate("/signin");
//     } else if (role === "admin") {
//       navigate("/admin");
//     } else {
//       navigate("/dashboard");
//     }
//   };

//   // ✅ Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/signin");
//   };

//   return (
//     <nav className="bg-orange-600 text-white shadow sticky top-0 z-50">
//       <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-200"
//         >
//           🍽️ TasteWithBecca
//         </Link>

//         {/* Right section */}
//         <div className="flex items-center gap-6 flex-wrap justify-end">
//           {/* Nav Links */}
//           <div className="flex items-center gap-5">
//             <Link
//               to="/"
//               className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
//             >
//               <Home size={20} /> <span className="hidden sm:inline">Home</span>
//             </Link>

//             <Link
//               to="/menu"
//               className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
//             >
//               <Menu size={20} /> <span className="hidden sm:inline">Menu</span>
//             </Link>

//             <Link
//               to="/cart"
//               className="relative flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
//             >
//               <ShoppingCart size={22} />
//               <span className="hidden sm:inline">Cart</span>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* ✅ Dashboard link as a button */}
//             <button
//               onClick={handleDashboardClick}
//               className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
//             >
//               <User size={20} /> <span className="hidden sm:inline">Dashboard</span>
//             </button>

//             {/* ✅ Logout button */}
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
//             >
//               <LogOut size={20} /> <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>

//           {/* Search */}
//           <div className="hidden md:flex items-center overflow-hidden rounded-full border border-orange-200 bg-white">
//             <input
//               type="text"
//               placeholder="Search meals..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="p-2 pl-4 text-black outline-none w-64"
//             />
//             <button className="p-3 bg-orange-700 hover:bg-orange-800 transition-colors duration-200">
//               <Search size={18} className="text-white" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Home, Menu, Search, User, LogOut, X } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleDashboardClick = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/signin");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

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

        {/* Hamburger Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Nav Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:gap-6 md:w-auto mt-4 md:mt-0 transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
            <Link
              to="/"
              className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <Home size={20} /> <span>Home</span>
            </Link>

            <Link
              to="/menu"
              className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <Menu size={20} /> <span>Menu</span>
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart size={22} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                handleDashboardClick();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
            >
              <User size={20} /> <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 hover:bg-orange-700 px-3 py-2 rounded-full transition-colors duration-200"
            >
              <LogOut size={20} /> <span>Logout</span>
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 md:mt-0 md:ml-4 hidden md:flex items-center overflow-hidden rounded-full border border-orange-200 bg-white">
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
