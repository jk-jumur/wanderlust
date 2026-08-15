import Image from "next/image";
import Link from "next/link";
import { 
  FaStar, 
  FaRegCalendarAlt, 
  FaCheckCircle, 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaShieldAlt, 
  FaHeadset 
} from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { Button } from "@heroui/react";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  // API call to fetch single destination details
  const res = await fetch(`http://localhost:5000/destination/${id}`, { cache: "no-store" });
  const destination = await res.json();

  const {
    imageUrl,
    destinationName,
    country,
    price,
    duration,
    rating = "4.9",
    reviewsCount = "234",
    overview = "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
    highlights = [
      "Luxury beachfront accommodation",
      "Traditional Balinese spa treatment",
      "Sunrise trek to Mount Batur",
      "Visit Uluwatu Temple at sunset",
      "Private beach dinner experience",
    ],
  } = destination;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      
      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/destinations"
          className="group flex items-center gap-2 text-gray-600 hover:text-cyan-600 font-semibold text-sm transition-all"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          <span>Back to Destinations</span>
        </Link>

        {/* Action Buttons (Edit & Delete) */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="bordered" className="border-gray-200 hover:border-cyan-500 hover:text-cyan-600 text-gray-700 flex items-center gap-1.5 text-xs font-semibold rounded-xl">
            <FaEdit className="text-xs" /> Edit
          </Button>
          <Button size="sm" variant="flat" color="danger" className="bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center gap-1.5 text-xs font-semibold rounded-xl">
            <FaTrash className="text-xs" /> Delete
          </Button>
        </div>
      </div>

      {/* Big Hero Banner Image */}
      <div className="relative w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-lg group">
        <Image
          src={imageUrl}
          alt={destinationName || "Destination Details"}
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Floating Location Badge */}
        <div className="absolute bottom-6 left-6">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-medium shadow-md">
            <LuMapPin className="text-cyan-300 text-base" />
            <span>{country}</span>
          </div>
        </div>
      </div>

      {/* Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Details Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Title & Rating */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {destinationName}
            </h1>

            {/* Quick Info Bar */}
            <div className="flex items-center gap-6 text-sm text-gray-600 border-b pb-6">
              <div className="flex items-center gap-1.5">
                <FaStar className="text-amber-400 text-base" />
                <span className="font-bold text-gray-900">{rating}</span>
                <span className="text-gray-400">({reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <FaRegCalendarAlt className="text-cyan-600" />
                <span>{duration}</span>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800">Overview</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {overview}
            </p>
          </div>

          {/* Highlights Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xl font-bold text-gray-800">Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights?.map((item) => {
                const itemKey = typeof item === "object" ? (item._id || item.id) : item;
                const itemText = typeof item === "object" ? item.text : item;

                return (
                  <div key={itemKey} className="flex items-center gap-2.5 text-gray-700 text-sm font-medium">
                    <FaCheckCircle className="text-cyan-600 shrink-0 text-base" />
                    <span>{itemText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Animated Smart Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 border border-cyan-100 bg-gradient-to-b from-white via-cyan-50/20 to-white p-6 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
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
                defaultValue="2026-08-15"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white shadow-sm transition-all"
              />
            </div>

            {/* Book Now Button */}
            <Button
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

      </div>
    </div>
  );
};

export default DestinationDetailsPage;