import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
    ];
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    
    if(isLoggedIn === false){
        links.splice(2,2);
    }
    

    const [MobileNav, setMobileNav] = useState(false);

    const toggleMenu = () => setMobileNav(!MobileNav);

    return (
        <>
            <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
                <Link to="/" className='flex items-center'>
                    <img
                        className='h-10 me-4'
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className='text-2xl font-semibold'>BookHeaven</h1>
                </Link>

                <div className='nav-links-bookheaven block md:flex items-center gap-4'>
                    {/* Desktop Links */}
                    <div className='hidden md:flex gap-4'>
                        {links.map((item, i) => (
                            <Link key={i} to={item.link} className="hover:text-blue-500 transition-all duration-300">
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className='hidden md:flex gap-4'>
                        <Link to="/LogIn" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
                            LogIn
                        </Link>
                        <Link to="/SignUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
                            SignUp
                        </Link>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className='text-white text-2xl hover:text-zinc-400 md:hidden' onClick={toggleMenu}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`${MobileNav ? "block" : "hidden"} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((item, i) => (
                    <Link key={i} to={item.link} onClick={toggleMenu} className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300">
                        {item.title}
                    </Link>
                ))}

                <Link to="/LogIn" onClick={toggleMenu} className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300">
                    LogIn
                </Link>
                <Link to="/SignUp" onClick={toggleMenu} className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                    SignUp
                </Link>
            </div>
        </>
    );
};

export default Navbar;
