import Google from "../assets/Google.png";
import Apple from "../assets/Apple.png";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { FaSnapchat } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="bg-orange-500 text-white p-8 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo + App Stores */}
        <div className="flex flex-col items-start gap-4">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            TasteWithBecca
          </Link>
          <div className="flex gap-4">
            <img className="w-20" src={Google} alt="Google Play" />
            <img className="w-20" src={Apple} alt="Apple Store" />
          </div>
          <p className="text-[12px] max-w-xs">
            Company # 490039-445, Registered with House of Companies.
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2 max-w-xs">
          <h1 className="text-[12px]">Get Exclusive Deals in your Inbox</h1>
          <div className="relative">
            <input
              type="email"
              placeholder="you@gmail.com"
              className="bg-white w-full text-[12px] pl-3 pr-24 py-2 border border-orange-700 rounded-2xl text-black"
            />
            <button className="text-[12px] bg-orange-400 rounded-2xl py-2 px-4 absolute right-1 top-1">
              Subscribe
            </button>
          </div>
          <p className="text-[12px]">We won’t spam — read our email policy.</p>
          <div className="flex gap-4 text-xl mt-2">
            <Link to="#">
              <FaFacebook className="hover:scale-110 transition-transform" />
            </Link>
            <Link to="#">
              <AiFillInstagram className="hover:scale-110 transition-transform" />
            </Link>
            <Link to="#">
              <AiFillTikTok className="hover:scale-110 transition-transform" />
            </Link>
            <Link to="#">
              <FaSnapchat className="hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-2 text-[12px]">
          <h2 className="font-bold mb-2">Legal Pages</h2>
          <Link to="#">Legal Pages</Link>
          <Link to="#">Terms and Conditions</Link>
          <Link to="#">Privacy</Link>
          <Link to="#">Cookies</Link>
          <Link to="#">Modern Slavery System</Link>
        </div>

        {/* Important Links */}
        <div className="flex flex-col gap-2 text-[12px]">
          <h2 className="font-bold mb-2">Important Links</h2>
          <Link to="#">Get Help</Link>
          <Link to="#">Add Your Restaurant</Link>
          <Link to="#">Sign Up to Deliver</Link>
          <Link to="#">Create a Business Account</Link>
        </div>
      </div>

      <footer className="bg-orange-600 text-white text-center py-4 text-[12px]">
        &copy; {new Date().getFullYear()} Taste With Becca. All rights reserved.
      </footer>
    </>
  );
};

export default Footer;
