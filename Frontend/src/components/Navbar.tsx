import NavbarItem from "./NavbarItem"
import React from 'react'
// import { BsChevronDown } from "react-icons/bs";
import { useCallback, useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { MdOutlineLightMode } from "react-icons/md";
// import Image from "next/image";
const TOP_OFFSET = 66;

const Navbar = () => {
    // const { setTheme } = useTheme()
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET){
                setShowBackground(true);
            }else {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);



    return(
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center relative transition duration-500 bg-black-100 bg-opacity-40 backdrop-blur-l ${showBackground ? "bg-black-100" : ""}`}>
                {/* Centered navigation items */}
                <p>djaoisjda</p>
                <div className="flex-row gap-7 hidden lg:flex absolute left-1/2 -translate-x-1/2">
                    {/* <NavbarItem  link="/"/> */}
                    <NavbarItem label="About" link="#about"/>
                    <NavbarItem label="Experience" link="#experience"/>
                    <NavbarItem label="Projects" link="#projects"/>
                    <NavbarItem label="Contact" link="#contact"/>
                </div>

                {/* Mobile menu - aligned to center */}
                {/* <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 absolute left-1/2 -translate-x-1/2 cursor-pointer">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                </div> */}

                {/* Theme toggle - kept on the right */}
                {/* <div className="ml-auto">
                    <MdOutlineLightMode 
                        onClick={() => setTheme("dark")} 
                        className="cursor-pointer hover:text-purple-400 transition w-6 h-6"
                    />
                </div> */}
            </div>
        </nav>
    );
}

export default Navbar;