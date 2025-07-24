import star from "../assets/star.png";
import location from "../assets/location.png";  
import { MdFlashOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    < div className="flex flex-row ">
    <div className="flex flex-row p-3 items-center md:w-[33%] ">

    <img className="w-7 ml-2" src={star} alt="" />
    <div className="text-sm  ml-2">
        <Link to='#'>Get 5% Off your first order, <span className="text-orange-600">Promo: ORDER5</span></Link>
    </div>
    </div>
    <div className="  md:w-[33%] md:flex hidden  p-3 items-center">
        <img className="w-5" src={location} alt="" />
        <div className="ml-2">
            <p>Regent Street, A4, A4201, London</p>
        </div>
    </div>
    <div className="font-bold text-white text-center md:w-[34%] w-[50%] bg-red-700">
      <p className="p-4 flex items-center justify-center gap-2">     
        FLASH SALES ONGOING!!!
        <MdFlashOn className="text-white text-xl w-15" />
      </p>
</div>


    </ div>
  )
}

export default Header