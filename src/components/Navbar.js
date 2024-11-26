"use client"; // This ensures the component runs on the client side since it uses Redux and browser-specific features.

import { useSelector } from "react-redux";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <div
        className={`flex h-[56px] items-center justify-center border-b-[0px] border-b-richblack-900
          fixed z-50 top-0 left-0 w-full bg-[#000814]
          transition-all duration-200 shadow-[10px_-5px_15px_-5px] shadow-white`}
      >
        <div className="mx-4 m-4 md:m-0 justify-between gap-x-1 sm:justify-center sm:gap-x-10 md:gap-x-0 flex w-11/12 max-w-maxContent items-center md:justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="md:block text-richblack-25 font-extrabold shadow-[12px_-12px_13px_-2px] shadow-richblue-300 bg-richblack-900 rounded-l-3xl rounded-sm p-2"
          >
            Task
          </Link>

          <Link href="/">
            <p className="md:block shadow-[1px_-1px_8px_-2px] shadow-richblue-300 text-[#7FFFD4] hover:scale-105 rounded-md bg-richblack-900 p-1">
              Home
            </p>
          </Link>

          {/* Login / Signup / Dashboard */}
          <div className="flex items-center gap-x-3 md:gap-x-4 md:flex md:font-semibold">
            {token === null && (
              <Link href="/login">
                <button className="md:block rounded-[8px] border border-caribbeangreen-200 bg-richblack-800 px-[12px] py-[4px] text-richblack-100">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link href="/signup">
                <button className="md:block rounded-[8px] border border-caribbeangreen-200 bg-richblack-800 px-[12px] py-[4px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            )}
             {token !== null && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;


// 'use client';

// import Link from 'next/link';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearAuth } from '@/store/authSlice';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);  // Access the user from Redux
//   const router = useRouter();

//   const handleLogout = () => {
//     dispatch(clearAuth());  // Clear auth state
//     localStorage.removeItem('token');  // Remove the token from localStorage
//     router.push('/login');  // Redirect to Login page
//   };

//   return (
//     <nav className="bg-blue-600 p-4 text-white">
//       <div className="container mx-auto flex justify-between">
//         <ul className="flex space-x-4">
//           <li><Link href="/about">About</Link></li>
//           <li><Link href="/contact">Contact</Link></li>
//           {user && <li><Link href="/profile">Profile</Link></li>}  {/* Conditionally render Profile link */}
//         </ul>
//         <ul className="flex space-x-4">
//           {!user ? (
//             <>
//               <li><Link href="/login">Login</Link></li>
//               <li><Link href="/signup">Signup</Link></li>
//             </>
//           ) : (
//             <button onClick={handleLogout} className="bg-red-600 p-2 rounded text-white">
//               Logout
//             </button>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }
