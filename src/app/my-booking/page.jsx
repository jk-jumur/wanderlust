import MyBookingCard from "@/components/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { FaCompass } from "react-icons/fa";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

     const {token} = await auth.api.getToken({
            headers: await headers()
        })
  const user = session?.user;

  const res = await fetch(`http://localhost:5000/booking/${user?.id}`, {
       headers:{
           authorization: `Bearer ${token}`
       }
  });
  const bookings = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 my-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-tight">
          My Bookings
        </h2>
        <p className="text-[#6C696D] text-sm mt-1">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Bookings List Section */}
      <div className="space-y-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <MyBookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          /* High-End Modern Empty State Card */
          <div className="relative overflow-hidden border border-cyan-100/80 bg-linear-to-b from-cyan-50/40 via-white to-white rounded-3xl p-12 text-center shadow-xl shadow-cyan-900/5 max-w-xl mx-auto my-8 transition-all">
            
            {/* Background Soft Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-200/40 blur-3xl rounded-full pointer-events-none" />

            {/* Icon Circle */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white border border-cyan-100 text-cyan-600 rounded-2xl mb-6 shadow-md shadow-cyan-600/10">
              <FaCompass className="text-3xl animate-spin-slow" />
            </div>

            {/* Text Content */}
            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
              No Travel Plans Yet
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed font-medium">
              Your itinerary is completely empty. Explore top destinations and start planning your next getaway today!
            </p>

            {/* Button */}
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/40"
            >
              Explore Destinations →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;