import DestinationCard from '@/components/destinationCard';
import React from 'react';

const DestinationsPage = async () => {
  const res = await fetch('http://localhost:5000/destination', { cache: 'no-store' });
  const destinations = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Destinations</h2>
      
      {/* Responsive Grid with gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations?.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;