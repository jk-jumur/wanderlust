import Image from "next/image";
import Link from "next/link";



const Navbar = () => {
    return (
      
       <nav className="flex justify-between m-5 bg-white">

           <ul className="flex  gap-4">
               <li><Link href='/'>Home</Link></li>
               <li><Link href='/destinations'>Destinations</Link></li>
               <li><Link href='/my-booking'>My Bookings</Link></li>
               <li><Link href='/add-destination'>Add Destination</Link></li>
           </ul>
                 <div>
                      <Image 
                        src={"/assets/Wanderlast.png"}
                          alt="wanderlust logo"
                        height={100}
                        width={100}
                      />
                 </div>


                  <ul className="flex gap-4">
                         <li><Link href='/profile'>Profile</Link></li>
                          <li><Link href='/login'>Login</Link></li>
                         <li><Link href='/signup'>Sign Up</Link></li>
             
           </ul>

       </nav>
    )
    
};

export default Navbar;