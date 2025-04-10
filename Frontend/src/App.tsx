import './App.css'
import NavbarItem from './components/NavbarItem'
import React from 'react'
import { useState, useEffect } from 'react'
import logo from "../public/images/svg.svg"
function App() {
  return (
      <div>
        <Navbar/>
      </div>
    
  )
}
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
  <div className={`px-4 md:px-16 py-6 flex items-center justify-between relative transition duration-500 bg-white bg-opacity-40 backdrop-blur-l ${showBackground ? "bg-black" : ""}`}>
    
    {/* Title on the left */}
    <div className="text-black font-bold text-2xl">
      CAS Spring Integration Visualization
    </div>

    {/* Logo on the right */}
    <div className="flex items-center">
      <img
        src={logo}
        alt="Logo"
        className="h-10 w-auto " 
      />
    </div>

  </div>
</nav>
    );
}

export default App
