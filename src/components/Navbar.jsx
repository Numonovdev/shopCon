import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {cart, setCart}= useContext(CartContext)
 
  const[count, setCount]= useState(0);


useEffect(()=>{
   let sum = 0
   cart.forEach(e => {
    sum += Number(e.count)
   });
   setCount(sum)
},[cart])




 
 
 
 
 
  const toggleMenu = () => {
     setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex container mx-auto navbar justify-between  py-4">

      <div className="flex items-center">
        <Link to="/" className="btn btn-ghost  btn-secondary bg-pink-400 text-xl">C</Link>
      </div>


      <div className="hidden md:flex">
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/checkout" onClick={toggleMenu}>Checkout</Link></li>
          <li><Link to="/orders" onClick={toggleMenu}>Orders</Link></li>
        </ul>
      </div>


      <div role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="badge badge-xs indicator-item">{count}</span>
          </Link>
        </div>
      </div>


      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-full bg-black/80 backdrop-blur-sm p-5 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}>
        <button onClick={toggleMenu} className="text-white text-2xl absolute top-5 right-5">
          <i className="fa-solid fa-times"></i>
        </button>
        <ul className="flex flex-col items-start space-y-4 mt-10 text-white">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/products" onClick={toggleMenu}>Products</Link></li>
          <li><Link to="/cart" onClick={toggleMenu}>Cart</Link></li>
          <li><Link to="/checkout" onClick={toggleMenu}>Checkout</Link></li>
          <li><Link to="/orders" onClick={toggleMenu}>Orders</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
