"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  HelpCircle, 
  Cpu, 
  Home 
} from "lucide-react";

const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
  );
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const path = usePathname();
  const NavLinks = [
    { 
      href: "/", 
      label: "Home", 
      icon: Home 
    },
    { 
      href: "/dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard 
    },
    { 
      href: "/dashboard/question", 
      label: "Questions", 
      icon: Cpu 
    },
    { 
      href: "/dashboard/howit", 
      label: "How it works?", 
      icon: HelpCircle 
    }
  ];

  const NavItem = ({ href, label, icon: Icon, currentPath }) => (
    <Link href={href} className="block">
      <li
        className={`
          px-4 py-2 
          rounded-lg 
          flex items-center 
          space-x-2
          transition-all 
          duration-300 
          ease-in-out
          group
          ${currentPath === href 
            ? "bg-teal-600/10 text-teal-600 font-semibold" 
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-teal-600"
          }
          transform hover:scale-105 
          active:scale-95
          hover:shadow-md
        `}
      >
        <Icon 
          className={`
            w-5 h-5 
            transition-all 
            duration-300 
            group-hover:rotate-12
            group-hover:scale-110
            drop-shadow-md
            ${currentPath === href ? 'text-teal-600' : 'text-gray-400'}
          `} 
        />
        <span>{label}</span>
      </li>
    </Link>
  );

  return (
    <header className="bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo with 3D Hover Effect */}
        <Link 
          href="/dashboard" 
          className="hidden md:block transition-all duration-300 group"
        >
          <Image 
            src={logo} 
            width={200} 
            height={80} 
            alt="logo" 
            priority
           
          />
        </Link>

        {/* Mobile Menu Toggle with Interactive Icon */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="
              text-gray-600 dark:text-gray-300 
              hover:text-teal-600 
              focus:outline-none 
              transition-all
              p-2 
              rounded-md
              hover:bg-gray-100 
              dark:hover:bg-gray-800
              group
            "
          >
            {isOpen ? (
              <X 
                size={24} 
                className="
                  transform 
                  group-hover:rotate-180 
                  transition-transform
                  drop-shadow-md
                " 
              />
            ) : (
              <Menu 
                size={24} 
                className="
                  transform 
                  group-hover:scale-110 
                  transition-transform
                  drop-shadow-md
                " 
              />
            )}
          </button>
        </div>

        {/* Desktop Navigation with 3D-like Icons */}
        <nav className="hidden md:block">
          <ul className="flex space-x-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-2 shadow-inner">
            {NavLinks.map((link) => (
              <NavItem 
                key={link.href} 
                href={link.href} 
                label={link.label} 
                icon={link.icon}
                currentPath={path} 
              />
            ))}
          </ul>
        </nav>

        {/* Right Side Actions with Hover Effects */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <div 
            className="
              w-10 h-10 
              flex items-center 
              justify-center 
              transition-transform 
              hover:scale-110 
              active:scale-95
            "
          >
            {isUserButtonLoaded ? (
              <div className="
                rounded-full 
                overflow-hidden 
                shadow-md 
                hover:shadow-lg 
                transition-shadow
              ">
                <UserButton />
              </div>
            ) : (
              <SkeletonLoader />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Slide Animation */}
      {isOpen && (
        <div 
          className="
            md:hidden 
            absolute 
            top-full 
            left-0 
            w-full 
            bg-background 
            shadow-lg 
            dark:bg-gray-900
            border-t 
            dark:border-gray-700
            animate-slide-down
          "
        >
          <nav className="container max-w-6xl mx-auto px-4 py-6">
            <ul className="space-y-2">
              {NavLinks.map((link) => (
                <NavItem 
                  key={link.href} 
                  href={link.href} 
                  label={link.label} 
                  icon={link.icon}
                  currentPath={path} 
                />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
