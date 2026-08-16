
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingPage = async() => {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
    const user = session?.user

     const res = await fetch(`http://localhost:5000/booking/${user?.id}`);
      const data = await res.json()
      console.log(data);
    return (
        <div>
            <h2>My Bookings</h2>
            <p>Manage and view your upcoming travel plans</p>

        </div>
    );
};

export default MyBookingPage;