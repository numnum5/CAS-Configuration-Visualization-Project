
import { JSX } from "react";
import React from 'react'
import { Link } from "react-router-dom";
interface NavbarItemProps {
    label : string
    link : string
}


const NavbarItem  = ({label, link} : NavbarItemProps) : JSX.Element => {
    // console.log(label);

    return (
        // <Link to={link}>
        <div
            className="text-red-500 cursor-pointer hover:text-gray-300 transition">
            
            {label}

        </div>
        
    );
}


export default NavbarItem;