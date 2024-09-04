import { Navbar, } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyNavbar = () => {

  const login = localStorage.getItem('login');
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure want to Logout ??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "#057A55",
      cancelButtonColor: "#F05252 "
    }).then((result) => {
      if(result.isConfirmed){
        localStorage.removeItem("login");
        navigate('/');
      }    
    })
  };

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

      {login ? (
        <button onClick={handleLogout}> <span className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer">Log Out</span></button>
      ) : (
        <></>
      )}
        
      {login ? (<></>) : (
        <Link 
        to={'/register'} 
        className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
      >
        Register
      </Link>
      )}

      {!login && (
        <Link 
        to={'/login'} 
        className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
      >
        Login
      </Link>
      )}
        

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

      {login ? (
        <button onClick={handleLogout}> <span className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer">Log Out</span></button>
      ) : (
        <></>
      )}
        
      {login ? (<></>) : (
        <Link 
        to={'/register'} 
        className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
      >
        Register
      </Link>
      )}

      {!login && (
        <Link 
        to={'/login'} 
        className="text-gray-300 font-semibold text-lg hover:text-white cursor-pointer"
      >
        Login
      </Link>
      )}
      </Navbar.Collapse>
    </Navbar>
  );
}
 
export default MyNavbar;