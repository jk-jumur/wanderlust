
import Image from "next/image";
import Link from "next/link";
import { 
  FaStar, 
  FaRegCalendarAlt, 
  FaCheckCircle, 
  FaArrowLeft, 
 

 
} from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

import EditModal from "@/components/EditModal";
import DeleteDialog from "@/components/DeleteDialog";
import BookingCard from "@/components/BookingCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
    const {token} = await auth.api.getToken({
        headers: await headers()
    })

  // API call to fetch single destination details
  const res = await fetch(`http://localhost:5000/destination/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
   });

   const destination = await res.json();

  const {
    imageUrl,
    destinationName,
    country,
   
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
         <EditModal destinationData={destination} />
          <DeleteDialog destinationData={destination}/>
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
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        
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
       
          <BookingCard destination={destination}/>

      </div>
    </div>
  );
};

export default DestinationDetailsPage;