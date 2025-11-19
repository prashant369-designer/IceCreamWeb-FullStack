import React, { useState, useEffect } from "react";
import { Search, Handbag, Heart } from "lucide-react";
import logo from "../../images/Metapos_logo-removebg-preview.png";
import { IoIosLogOut } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { RiMenu5Fill } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";

function Navbar() {
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchcart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchlike = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/like");
      setLike(response.data);
    } catch (error) {
      console.error("Error fetching like:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchcart();
      fetchlike();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartlength = cart.length;
  const likelength = like.length;

  return (
    <div className="text-white flex justify-between items-center px-4 sm:px-4 py-2 bg-white">

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center mr-4">
        <button onClick={toggleMenu} className="text-black">
          <RiMenu5Fill size={24} strokeWidth={1} className="text-black w-[30px]" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-90 bg-white text-black transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex justify-between items-center p-4 ">
          <img src={logo} alt="" className="h-14 " />
          <button onClick={toggleMenu} className="text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col space-y-4 p-4 text-black text-lg ">
          <div className="">
            <h1 className="text-lg text-gray-600 text-center">Need help? Call us</h1>
            <h1 className="text-sm text-red-500 font-bold text-center">+(91) 123456789</h1>
          </div>

          <Link to="/" className="hover:text-red-600" onClick={toggleMenu}>Home</Link>
          <Link to="/story" className="hover:text-red-600" onClick={toggleMenu}>Our Story</Link>
          <Link to="/shop" className="hover:text-red-600" onClick={toggleMenu}>Shop</Link>
          <Link to="/blog" className="hover:text-red-600" onClick={toggleMenu}>Blog</Link>
          <Link to="/menu" className="hover:text-red-600" onClick={toggleMenu}>Menu</Link>
          <Link to="/contact" className="hover:text-red-600" onClick={toggleMenu}>Contact Us</Link>

          <div className="flex space-x-8 ml-0 mt-4">
            <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
            <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
            <a href="https://pinterest.com"><i className="fab fa-pinterest"></i></a>
            <a href="https://youtube.com"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Center Logo (Mobile) */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center ">
          <Link to="/" className="md:hidden ml-12">
            <img src={logo} alt="logo" className="w-40 h-18 object-cover" />
          </Link>
        </div>

        <span className="flex flex-col text-gray-600 text-sm hidden md:flex">
          <div className="mx-2">Need help? Call Us:</div>
          <div className="text-red-500 font-bold">+1834 123 456 789</div>
        </span>
      </div>

      {/* Main Navbar Links */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="flex space-x-6 text-black text-lg">
          <Link to="/" className="hover:text-red-600 mt-4">Home</Link>
          <Link to="/story" className="hover:text-red-600 mt-4">Our Story</Link>
          <Link to="/shop" className="hover:text-red-600 mt-4">Shop</Link>

          <Link to="/">
            <img src={logo} alt="logo" className="w-40 h-15 object-cover" />
          </Link>

          <Link to="/blog" className="hover:text-red-600 mt-4">Blog</Link>
          <Link to="/menu" className="hover:text-red-600 mt-4">Menu</Link>
          <Link to="/contact" className="hover:text-red-600 mt-4">Contact Us</Link>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex justify-between space-x-4 items-center">
        {token ? (
          <>
            <Link className="hidden sm:block" to="/search">
              <span className="cursor-pointer text-black">
                <Search size={22} strokeWidth={3} />
              </span>
            </Link>

            <Link to="/like" className="hidden sm:block relative">
              <span className="cursor-pointer text-black">
                <Heart size={22} strokeWidth={3} />
              </span>
              {likelength > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center -mt-2 -mr-2 h-5 w-5 rounded-full bg-red-500 text-xs font-bold text-white">
                  {likelength}
                </span>
              )}
            </Link>

            <Link to="/cart" className="hidden sm:block relative">
              <span className="cursor-pointer text-black">
                <Handbag size={22} strokeWidth={3} />
              </span>
              {cartlength > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center -mt-2 -mr-2 h-5 w-5 rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartlength}
                </span>
              )}
            </Link>

            <button onClick={handleLogout}>
              <span className="cursor-pointer text-red-600">
                <IoIosLogOut size={22} strokeWidth={3} />
              </span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="lg:hidden">
              <span className="cursor-pointer text-red-600">
                <CiLogin size={26} strokeWidth={1} />
              </span>
            </Link>

            <Link to="/login">
              <span className="hidden sm:block border border-red-500 rounded-full px-4 py-2 cursor-pointer text-black hover:text-white hover:bg-red-600">
                Login
              </span>
            </Link>

            <Link to="/signup">
              <span className="hidden sm:block border border-red-500 rounded-full px-4 py-2 cursor-pointer text-black hover:text-white hover:bg-red-600">
                Signup
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
