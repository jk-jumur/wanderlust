import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

const DestinationCard = ({ destination }) => {
  const { imageUrl, country, duration, price, destinationName } = destination;

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
      {/* Image Container with fixed height */}
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={destinationName || "Destination Image"}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <LuMapPin className="text-red-500" />
          <span>{country}</span>
        </div>

        <div className="flex justify-between items-start gap-2">
          <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
            {destinationName}
          </h2>
          <h2 className="font-bold text-emerald-600 text-lg">${price}</h2>
        </div>

        <div className="flex gap-2 items-center text-xs text-gray-500 pt-2 border-t">
          <FaRegCalendar />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;