import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");

  const menuItems = [
    { name: "Hero Section", path: "/Home" },
    { name: "About Studio", path: "/About" },
    { name: "Program", path: "/ProgramLIst" },
    { name: "Online Classes", path: "/ClassList" },
    { name: "Author", path: "/Author" },
    { name: "Testimonials", path: "/Testimonials" },
    { name: "Footer Section", path: "/Footer" },
  ];

  return (
    <div className="bg-[#FCEC8C] font-jakarta font-bold bg-cover w-auto text-center text-[#361A06] min-h-screen  ">
      <div className="flex flex-row">
        <div>
          <img src="/Logo.png" alt="logo" className="  mt-[31px] w-10/12 ml-6" />
        </div>
      </div>
      <ul className="flex flex-col font-bold ml-8">
        {menuItems.map((item, index) => (
          <li key={index} className="flex flex-row items-center justify-center">
            <Link
              to={item.path}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center h-[48px] mt-10 w-full px-4 ${activeItem === item.name ? "bg-white" : ""
                }`}
            >
              <h1
                className="flex items-center text-[#361A06] 2xl:text-lg font-bold"
                style={{ lineHeight: "15px" }}
              >
                {item.name}
              </h1>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
