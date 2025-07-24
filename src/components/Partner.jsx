

// const Partner = () => {
//   return (
//     <>
//         <div className="flex flex-row">
//             <div className="rounded-xl w-full" style={{
//                 backgroundImage: "url('/partner1.png')",
//                 }}> 
                
//             </div>
//             <div className="rounded-xl w-full" style={{
//                 backgroundImage: "url('/partner1.png')",
//                 }}>
                    
//             </div>
//         </div>

//     </>
//   )
// }

// export default Partner


import React from "react";

const cards = [
  {
    image: "/partner1.png", // Replace with your image
    badge: "Earn more with lower fees",
    badgeClass: "left-6 top-6",
    title: "Partner with us",
    subtitle: "Signup as a business",
    button: "Get Started",
  },
  {
    image: "/partner2.png", // Replace with your image
    badge: "Avail exclusive perks",
    badgeClass: "left-6 top-6",
    title: "Ride with us",
    subtitle: "Signup as a rider",
    button: "Get Started",
  },
];

export default function Partner() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="relative flex-1 rounded-xl overflow-hidden shadow-md"
          style={{ minWidth: 0 }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-80 object-cover"
          />
          {/* Badge */}
          <div className={`absolute ${card.badgeClass} bg-white px-6 py-2 rounded-lg shadow font-semibold text-sm`}>
            {card.badge}
          </div>
          {/* Overlay */}
          <div className="absolute inset-0  bg-opacity-60 flex flex-col justify-end p-8">
            <div>
              <div className="text-orange-400 text-sm mb-1">{card.subtitle}</div>
              <div className="text-white text-3xl font-bold mb-6">{card.title}</div>
              <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow">
                {card.button}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}