import { NavLink } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React from "react";

const SideMenu = () => {
    const [ closeSideMenu, setCloseSideMenu ] = React.useState(true);
    return (
        <>
        {closeSideMenu && (
        <div className="flex lg:hidden">
            <div className="bg-black/75 px-5 h-screen z-10 pt-8 w-52 top-50 absolute text-white duration-300 backdrop-blur-sm">
                <ArrowLeftIcon className='h-6 w-6 mb-5 rounded-full text-white cursor-pointer top-9' onClick={() => setCloseSideMenu()}/>
                <ul>
                <li><NavLink to="/articles">Articulos</NavLink></li>
                <li><NavLink to="/chat">Chat</NavLink></li>
                </ul>
            </div>
        </div>
        )}
        </>
        
    )
}

export default SideMenu;