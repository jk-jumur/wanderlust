"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaHashtag, FaEye } from "react-icons/fa";
import { BookingDeleteAlert } from "./BookingDeleteAlert";


const MyBookingCard = ({ booking }) => {
  const {
    _id,
    destinationId,
    destinationName,
    imageUrl,
    price,
    departureDate,
    status = "Confirmed", 
  } = booking || {};


  const formattedDate = departureDate
    ? new Date(departureDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-5">
      {/* Destination Image */}
      <div className="relative w-full md:w-52 h-40 rounded-xl overflow-hidden shrink-0">
        <Image
          src={imageUrl || "/placeholder.jpg"}
          alt={destinationName}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Content */}
      <div className="flex-1 space-y-2.5 w-full">
        {/* Status Badge */}
        <span
          className={`inline-block px-3 py-0.5 text-xs font-semibold rounded-full ${
            status?.toLowerCase() === "confirmed"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-amber-50 text-amber-600 border border-amber-200"
          }`}
        >
          • {status}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          {destinationName}
        </h3>

        {/* Booking Info */}
        <div className="space-y-1 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span>Depart: {formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHashtag className="text-gray-400" />
            <span>Booking ID: {_id?.slice(-6) || _id}</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-xl font-black text-cyan-600 pt-1">
          ${price}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 w-full md:w-auto justify-end md:self-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
        {/* Cancel/Delete Button */}
          {/* Cancel/Delete Button */}
      <BookingDeleteAlert
       bookingId={_id}
       destinationName={destinationName}
       onDelete={(id) => console.log("Deleting booking:", id)}
      />

        {/* View Details Button */}
        <Link
          href={`/destinations/${destinationId || _id}`}
          className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <FaEye className="text-xs" />
          View
        </Link>
      </div>
    </div>
  );
};

export default MyBookingCard;