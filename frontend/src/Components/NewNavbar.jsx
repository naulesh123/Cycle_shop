import React from "react";
import { Navbar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import nit_logo from "../assets/nit_logo.png";
import { Sign_in } from "./Sign_in";
function NavList() {
  return (
    <ul className="flex flex-row gap-4 lg:gap-6 items-center">
      <li className="font-medium">
        <Dropdown />
      </li>
      <li className="font-medium">
        <Link to="/Sell" className="hover:text-blue-500 transition-colors text-blue-gray-900">
          Sell
        </Link>
      </li>
      
      <li className="font-medium">
        <Sign_in/>
      </li>
      
    </ul>
  );
}

export function NewNavbar() {
  return (
    <Navbar className="w-full mx-auto max-w-none px-6 py-4 navbar-top">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="flex items-center">
          <Typography
            as="h1"  // Changed to 'h1' for semantic HTML (better for SEO and accessibility)
            variant="h5"
            className="text-blue-gray-900 cursor-pointer"
          >
            Cycle shop
            

          </Typography>
        </Link>
        <div className="lg:flex justify-end">
          <NavList />
         
        </div>
      </div>
    </Navbar>
  );
}

export default NewNavbar;
