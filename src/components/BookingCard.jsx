"use client";
import { Button } from "@heroui/react";
import { FaCheckCircle, FaHeadset, FaShieldAlt } from "react-icons/fa";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";


const BookingCard = ({destination}) => {
       const {data: session} = authClient.useSession()
      const user = session?.user
             const [departureDate, setDepartureDate] = useState("2026-08-15")
             const {price, _id, destinationName, imageUrl, country } = destination;
              const handleBooking = async()=>{
                    const bookingData = {
                        userId: user?.id,
                        userImage: user?.image,
                        userName: user?.name,
                        destinationId: _id,
                        destinationName,
                        price,
                        imageUrl,
                        country,
                        departureDate: new Date(departureDate)
                    }


                      const res = await fetch('http://localhost:5000/booking', {
                            method: "POST",
                            headers: {
                               "content-type": "application/Json"
                            },
                             body: JSON.stringify(bookingData)
                      })

                       const data = await res.json();
                       console.log(data);
              }

    return (
        <div className="lg:col-span-1">
                 <div className="sticky top-8 border border-cyan-100 bg-linear-to-b from-white via-cyan-50/20 to-white p-6 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   
                   {/* Price Header */}
                   <div>
                     <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-0.5">Starting from</span>
                     <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-black text-cyan-600 tracking-tight">${price}</span>
                       <span className="text-xs text-gray-400 font-medium">/ per person</span>
                     </div>
                   </div>
       
                   {/* Date Input */}
                   <div className="space-y-1.5">
                     <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Date</label>
                     <input
                       
                       type="date"
                       value={departureDate || ""}
                       onChange={(e) => setDepartureDate(e.target.value)}
                       className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white shadow-sm transition-all"
                     />
                   </div>
       
                   {/* Book Now Button */}
                   <Button
                     onClick={handleBooking}
                     className="w-full bg-cyan-600 hover:bg-cyan-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-cyan-600/20"
                   >
                     Book Now →
                   </Button>
       
                   {/* Features List */}
                   <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                     <div className="flex items-center gap-2 text-gray-600">
                       <FaCheckCircle className="text-cyan-600 text-sm shrink-0" />
                       <span>Free cancellation up to 7 days</span>
                     </div>
                     <div className="flex items-center gap-2 text-gray-600">
                       <FaShieldAlt className="text-cyan-600 text-sm shrink-0" />
                       <span>Travel insurance included</span>
                     </div>
                     <div className="flex items-center gap-2 text-gray-600">
                       <FaHeadset className="text-cyan-600 text-sm shrink-0" />
                       <span>24/7 customer support</span>
                     </div>
                   </div>
       
                 </div>
               </div>
    );
};

export default BookingCard;