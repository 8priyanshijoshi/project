import React, { useContext, useState } from 'react';
import { NavLink, Link} from 'react-router-dom'; // Uncommented to use NavLink for navigation
import { assets } from '../assets/assets';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [Visible,SetVisible] = useState(false)

    const {setShowSearch, getCartCount} = useContext(ShopContext);

    const handleLogout = async () => {
      try {
          await signOut(auth);
          console.log("User logged out successfully.");
          navigate("/"); // Redirect to login page after logout
      } catch (error) {
          console.error("Logout failed", error);
      }
  };
  

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}><img src={assets.logo} className='w-36' alt="Company Logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to="/home" className='flex flex-col items-center gap-1 text-gray-900 font-semibold'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/collection" className='flex flex-col items-center gap-1 text-gray-900 '>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>

        <NavLink to="/about" className='flex flex-col items-center gap-1 text-gray-900 '>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-0.5 bg-gray-700 hidden ' />
        </NavLink>

        <NavLink to="/contact" className='flex flex-col items-center gap-1 text-gray-900 '>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer'/>
            <div className="group relative">
                <img className="w-5 cursor-pointer" src={assets.profile_icon}  />
                <div className="hidden absolute right-0 pt-4 group-hover:block">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-300 text-white-500 rounded">
                        <button className="cursor-pointer hover:text-white">My Profile</button>
                        <button className="cursor-pointer hover:text-white">Orders</button>
                        <button onClick={handleLogout} className="cursor-pointer hover:text-white">Logout</button>
                    </div>
                </div>
            </div>
          <Link to='/cart' className='relative'>
              <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </Link>

          <img onClick={()=>SetVisible(true)}src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/*menubar for small-screen*/}
      <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${Visible ? 'w-full' : 'w-0'} `}>
          <div className='flex flex-col text-gray-600'>
              <div onClick={()=>SetVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                  <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                  <p>Back</p>
              </div>
              <NavLink onClick={()=>SetVisible(false)} className='py-2 pl-6 border' to='/home'>Home</NavLink>
              <NavLink onClick={()=>SetVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
              <NavLink onClick={()=>SetVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
              <NavLink onClick={()=>SetVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
          </div>
      </div>

    </div>
  );
};

export default Navbar;


// import React, { useContext, useState } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { assets } from '../assets/assets';
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase";
// import { ShopContext } from '../context/ShopContext';
// import { useSelector } from 'react-redux';

// const Navbar = () => {
//     const [Visible, SetVisible] = useState(false);
//     const { setShowSearch } = useContext(ShopContext);
//     const navigate = useNavigate();  // Fix: Initialize navigate function
//     const { cartItems } = useSelector(state => state.cart); // Fetch cart count from Redux

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             console.log("User logged out successfully.");
//             navigate("/"); // Redirect to login
//         } catch (error) {
//             console.error("Logout failed", error);
//         }
//     };

//     return (
//         <div className='flex items-center justify-between py-5 font-medium'>
//             <Link to={'/'}><img src={assets.logo} className='w-36' alt="Company Logo" /></Link>

//             <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
//                 <NavLink to="/home" className='flex flex-col items-center gap-1 text-gray-900 font-semibold'>HOME</NavLink>
//                 <NavLink to="/collection" className='flex flex-col items-center gap-1 text-gray-900'>COLLECTION</NavLink>
//                 <NavLink to="/about" className='flex flex-col items-center gap-1 text-gray-900'>ABOUT</NavLink>
//                 <NavLink to="/contact" className='flex flex-col items-center gap-1 text-gray-900'>CONTACT</NavLink>
//             </ul>

//             <div className='flex items-center gap-6'>
//                 <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' />
//                 <div className="group relative">
//                     <img className="w-5 cursor-pointer" src={assets.profile_icon} />
//                     <div className="hidden absolute right-0 pt-4 group-hover:block">
//                         <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-300 text-white-500 rounded">
//                             <button className="cursor-pointer hover:text-white">My Profile</button>
//                             <button className="cursor-pointer hover:text-white">Orders</button>
//                             <button onClick={handleLogout} className="cursor-pointer hover:text-white">Logout</button>
//                         </div>
//                     </div>
//                 </div>
//                 <Link to='/cart' className='relative'>
//                     <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
//                     <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
//                         {cartItems.length}
//                     </p>
//                 </Link>

//                 <img onClick={() => SetVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
//             </div>

//             {/* Small-Screen Menu */}
//             <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${Visible ? 'w-full' : 'w-0'}`}>
//                 <div className='flex flex-col text-gray-600'>
//                     <div onClick={() => SetVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
//                         <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
//                         <p>Back</p>
//                     </div>
//                     <NavLink onClick={() => SetVisible(false)} className='py-2 pl-6 border' to='/home'>Home</NavLink>
//                     <NavLink onClick={() => SetVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
//                     <NavLink onClick={() => SetVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
//                     <NavLink onClick={() => SetVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
