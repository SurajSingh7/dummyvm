"use client"; // This ensures the component is client-side since it uses hooks and window events.

import { useRef, useState, useEffect } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
// import { logout } from "../../../services/operations/authAPI";


export default function ProfileDropdown() {

   const logout=()=>{
    alert("logout");
   }


  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const imgRef = useRef();
  const proRef = useRef();
  const iconRef = useRef();
  const iconChildRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        e.target !== imgRef.current &&
        e.target !== proRef.current &&
        e.target !== iconRef.current &&
        e.target !== iconChildRef.current
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  if (!user) return null;

  let userName = user.name;
  if (userName.length > 10) {
    userName = `${userName.substring(0, 8)}.`;
  }

  return (
    <button className="relative">
      <div
        ref={proRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-x-1 text-sm text-richblack-100 font-bold"
      >
        <div className="hidden lg:block">{`Hi ${userName}!`}</div>

        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${userName}`}
          ref={imgRef}
          onClick={() => setOpen(!open)}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[36px] rounded-full object-cover"
        />

        <svg
          ref={iconRef}
          onClick={() => setOpen(!open)}
          className="w-[12px] h-[12px] text-gray-800 text-sm text-richblack-100 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 10"
        >
          <path
            ref={iconChildRef}
            onClick={() => setOpen(!open)}
            d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z"
          />
        </svg>
      </div>

      {open && (
        <div
          className="absolute top-[125%] right-[-90%] md:top-[125%] md:right-[-5%] z-[1000] divide-y-[1px]
          divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
        >
          <div
            onClick={() => {
              dispatch(logout(router)); // Use router for navigation
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[30px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
