"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";



const Navbar = () => {
    const {
       data: session,} = authClient.useSession()
 
      console.log(session)
      const user = session?.user


      const handleSignOut = async()=>{

          await authClient.signOut();
      }
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


                  <ul className="flex items-center gap-4">
                         <li><Link href='/profile'>Profile</Link></li>
                        { user? <>
                           <li> 
                              <Avatar>
                         <Avatar.Image referrerPolicy="no-referrerPolicy" alt="John Doe" src={user?.image} />
                         <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                           </li>
                           <li>
                             <Button onClick={handleSignOut} varient="danger" className="rounded-none">Logout</Button>
                           </li>
                        </>
                         :<>
                             <li><Link href='/login'>Login</Link></li>
                            <li><Link href='/signup'>Sign Up</Link></li>
                          </>
                          }
             
           </ul>

       </nav>
    )
    
};

export default Navbar;