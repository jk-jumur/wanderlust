import { Button } from "@heroui/react";
import Image from "next/image";
import { FaRegCalendar, FaStar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineArrowRight } from "react-icons/hi";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  const {_id, imageUrl, country, duration, price, destinationName, rating = "4.5" } = destination;

  return (
    <div className="group relative border border-cyan-100/70 rounded-2xl overflow-hidden p-3 transition-all duration-300 bg-white hover:bg-cyan-50/50 active:bg-cyan-100/60 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-900/10 hover:border-cyan-300 flex flex-col justify-between max-w-sm mx-auto w-full cursor-pointer">
      
      {/* Image Container */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName || "Destination Image"}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 bg-white/85 backdrop-blur-md text-gray-800 text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-bold shadow-sm border border-white/60">
          <span>{rating}</span>
          <FaStar className="text-amber-400 text-[10px]" />
        </div>
      </div>

      {/* Content Body */}
      <div className="pt-3 pb-2 space-y-2">
        {/* Country Badge */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
          <LuMapPin className="text-cyan-600 text-sm" />
          <span>{country}</span>
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-baseline gap-2">
          <h2 className="font-bold text-gray-800 text-base line-clamp-1 transition-colors duration-200 group-hover:text-cyan-700">
            {destinationName}
          </h2>
          <div className="flex items-baseline gap-0.5 whitespace-nowrap">
            <span className="font-extrabold text-gray-900 text-base group-hover:text-cyan-800 transition-colors">${price}</span>
            <span className="text-[11px] text-gray-400 font-normal">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex gap-1.5 items-center text-xs text-gray-500 font-medium">
          <FaRegCalendar className="text-gray-400 text-[11px]" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-gray-100 group-hover:border-cyan-200/60 flex justify-end transition-colors">
       <Link href={`/destinations/${_id}`}> <Button 
          size="sm"
          variant="light" 
          className="font-bold text-cyan-600 group-hover:text-cyan-700 text-xs p-0 min-w-0 bg-transparent hover:bg-transparent flex items-center gap-1"
        >
          <span>BOOK NOW</span>
          <HiOutlineArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
          </Link>
      </div>

    </div>
  );
};

export default DestinationCard;