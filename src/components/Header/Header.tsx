import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.scss";
import { FiMenu, FiX } from "react-icons/fi";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const hideSidebar = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="w-full relative">
        <div className="bg-white h-[70px] fixed z-50 top-0 left-0 right-0 shadow-md flex flex-row justify-between items-center md:left-[271px] px-3 md:px-7">
          <div
            className="flex items-center cursor-pointer text-[25px]"
            onClick={toggleSidebar}
          >
            <i>{open ? <FiX /> : <FiMenu />}</i>
          </div>
          <div className="flex items-center">
            <Link
              to={{
                pathname: "/account",
              }}
            >
              <div className="flex justify-center items-center">
                <img
                  className="md:mr-2 h-[40px] w-[40px] rounded-full object-cover"
                  src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                  alt=""
                />
                <span className="hidden md:block">Admin</span>
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`w-full transition-all duration-500 ease-in absolute ${
            open ? "top-0" : "top-[-1000px]"
          }`}
        >
          <Sidebar hideSidebar={hideSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Header;
