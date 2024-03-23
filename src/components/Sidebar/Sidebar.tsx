import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";
import {
  FiHome,
  FiUser,
  FiClock,
  FiBarChart2,
  FiCalendar,
} from "react-icons/fi";

interface SidebarProps {
  hideSidebar: () => void; // Hàm để ẩn Sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ hideSidebar }) => {
  const leftMenu = [
    {
      icon: <FiHome />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <FiBarChart2 />,
      label: "Actual Data",
      link: "/actual-data",
    },

    {
      icon: <FiCalendar />,
      label: "Reservation Forecast",
      link: "/reservation-forecast",
    },
    {
      icon: <FiClock />,
      label: "Period Detail",
      link: "/period-detail",
    },
    {
      icon: <FiUser />,
      label: "Account",
      link: "/account",
    },
  ];

  return (
    <div className="sidebar md:top-0 md:left-0 bg-[#eee] md:bg-white h-full md:h-full w-full md:w-[270px] mt-[70px] md:mt-0 overflow-hidden fixed z-20">
      <Link to="/" className="flex justify-center items-center">
        <img
          className="hidden md:block w-[72px] h-[72px] bg-cover bg-center mt-8 mb-2"
          src="https://infotelvn.com/thumbs_size/banner/2015_12/logo_header_png/165x98_fw_logo_header.png"
          alt="logo"
        />
      </Link>
      <ul className="py-4 md:py-10 pl-3">
        {leftMenu.map((item: any, index: any) => {
          return (
            <li className="mb-1" key={index}>
              <NavLink
                className={(isActive: boolean) =>
                  isActive
                    ? "sidebar__item-inner no-underline"
                    : "sidebar__item-inner_hover no-underline"
                }
                to={item.link}
                onClick={hideSidebar} // Ẩn Sidebar khi click vào một mục
              >
                <i className="text-lg">{item.icon}</i>
                <span className="ml-3 font-mono">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
