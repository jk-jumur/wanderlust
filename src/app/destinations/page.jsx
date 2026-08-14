import React from 'react';

const DestinationsPage = async() => {
     const res = await fetch('http://localhost:5000/destination')
     const destinations = await res.json()
      console.log (destinations);
    return (
        <div>
            <h2>All Destinations</h2>
             <div>
                  {
                    destinations.map(destination => <div key={destination._id}>
                         {destination.destinationName}
                    </div> )
                  }
             </div>
        </div>
    );
};

export default DestinationsPage;