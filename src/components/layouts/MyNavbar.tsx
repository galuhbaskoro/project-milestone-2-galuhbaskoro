import { Navbar, } from "flowbite-react";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar className="bg-[#1b5994] text-white py-4 fixed top-0 start-0 w-full z-20">
      <Navbar.Brand>
        <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="BasStore Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BasStore</span>
      </Navbar.Brand>
      <div className="hidden md:[display:flex!important;] md:flex-wrap md:gap-3">
        <Link 
          to={'/'} 
          className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
        >
          Products
        </Link>
        <Link 
          to={'/cart'} 
          className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
        >
          Cart
        </Link>
      </div>
      <Navbar.Toggle/>
      <Navbar.Collapse>
        <Link 
          to={'/'} 
          className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
        >
          Products
        </Link>
        <Link 
          to={'/cart'} 
          className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
        >
          Cart
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
 
export default MyNavbar;