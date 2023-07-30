import { NavLink } from "react-router-dom";
import ArticleSearch from "../ArticleSearch";
import { QueueListIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import SideMenu from "../SideMenu";

const Navbar = () => {
  const [toggleSearchBar, setToogleSearchBar] = React.useState(false);
  const [ openSideMenu, setOpenSideMenu ] = React.useState(false);
  return (
    <>
      <div className="bg-black flex justify-between items-center fixed z-10 top-0 w-full py-4 px-5 lg:py-2 lg:px-5 text-sm font-light">
        <ul className="flex items-center gap-3 text-white text-lg">
          <li className="text-white">
            <div><QueueListIcon className="h-12 w-12 lg:h-10 lg:w-10 md:flex lg:hidden cursor-pointer" onClick={() => setOpenSideMenu(!openSideMenu)}></QueueListIcon></div>
          </li>
          <li className="hidden lg:flex">
            <NavLink to="/articles">Articulos</NavLink>
          </li>
          <li className="hidden lg:flex">
            <NavLink to="/">Chat</NavLink>
          </li>
          <li className="hidden lg:flex">
            <NavLink to='/login'>Login</NavLink>
          </li>
        </ul>
        <ul className="flex items-center gap-3">
          <button><MagnifyingGlassCircleIcon className="h-12 w-12 lg:h-10 lg:w-10 text-white hover:bg-green-600 hover:rounded-full" onClick={() => setToogleSearchBar(!toggleSearchBar)}></MagnifyingGlassCircleIcon></button>
        </ul>
      </div>
      {toggleSearchBar && (
        <div className="bg-gray-500 flex justify-between items-center fixed z-10 top-12 w-full py-2 px-5 text-sm font-light">
          <ArticleSearch></ArticleSearch>
        </div>
      )}
      {openSideMenu && (
        <SideMenu/>
      )}
    </>
  );
};

export default Navbar;
