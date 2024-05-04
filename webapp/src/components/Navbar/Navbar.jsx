import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { styled } from '@mui/joy/styles';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const CustomButton = styled(Button)({
  fontSize: '16px',
  color: '#9206c9',
  '&:hover': {
    backgroundColor: '#e6d8eb',
  },
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const mobileDropdownTimeoutRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNavDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
    clearTimeout(dropdownTimeoutRef.current);
  };

  const handleDropdownMouseLeave = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    }
  };

  const handleMobileDropdownMouseEnter = () => {
    setIsOpen(true);
    clearTimeout(mobileDropdownTimeoutRef.current);
  };

  const handleMobileDropdownMouseLeave = (e) => {
    if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.relatedTarget)) {
      mobileDropdownTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const mobileDropdown = mobileDropdownRef.current;

    if (dropdown) {
      dropdown.addEventListener('mouseenter', handleDropdownMouseEnter);
      dropdown.addEventListener('mouseleave', handleDropdownMouseLeave);
    }

    if (mobileDropdown) {
      mobileDropdown.addEventListener('mouseenter', handleMobileDropdownMouseEnter);
      mobileDropdown.addEventListener('mouseleave', handleMobileDropdownMouseLeave);
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener('mouseenter', handleDropdownMouseEnter);
        dropdown.removeEventListener('mouseleave', handleDropdownMouseLeave);
      }

      if (mobileDropdown) {
        mobileDropdown.removeEventListener('mouseenter', handleMobileDropdownMouseEnter);
        mobileDropdown.removeEventListener('mouseleave', handleMobileDropdownMouseLeave);
      }
    };
  }, []);

  return (
    <header className="bg-white text-gray-800 py-2 px-6 md:px-8 lg:px-10 shadow-lg">
      <div className="flex justify-between items-center">
        <Link className="w-40" to="/">
          <img className="w-40" src="/logo.png" alt="Logo" />
        </Link>
        <nav className="hidden md:flex gap-4">
          <Link to="/about">
            <CustomButton size="md" variant="plain">
              About
            </CustomButton>
          </Link>

          <Link to="/login">
            <CustomButton size="md" variant="plain">
              Login
            </CustomButton>
          </Link>
          <Link to="/signup">
            <CustomButton size="md" variant="plain">
              Sign Up
            </CustomButton>
          </Link>
          <Link to="/profile">
            <CustomButton size="md" variant="plain">
              Profile
            </CustomButton>
          </Link>
          <Link to="/admin">
            <CustomButton size="md" variant="plain">
              Admin
            </CustomButton>
          </Link>
          <div className="relative" ref={dropdownRef}>
            <CustomButton
              size="md"
              variant="plain"
              onClick={toggleNavDropdown}
            >
              <DensityMediumIcon />
            </CustomButton>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/listings"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Listings
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/restaurant-profile"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Restaurant Profile
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/update-restaurant-profile"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Update Restaurant Profile
                </Link>
              </div>
            )}
          </div>
        </nav>
        <div className="md:hidden">
          <div className="relative">
            <button
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset "
              type="button"
              onClick={toggleDropdown}
            >
              <DensityMediumIcon />
            </button>
            <div ref={mobileDropdownRef} aria-labelledby="menu-button" aria-orientation="vertical" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" tabIndex="-1">
              {isOpen && (
                <>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/about"
                    id="menu-item-0"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    About
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/login"
                    id="menu-item-1"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Login
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/signup"
                    id="menu-item-2"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/profile"
                    id="menu-item-3"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Profile
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/admin"
                    id="menu-item-4"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Admin
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/listings"
                    id="menu-item-5"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Listings
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/restaurant-profile"
                    id="menu-item-6"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Restaurant Profile
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    to="/update-restaurant-profile"
                    id="menu-item-7"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Update Restaurant Profile
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        </div>
    </header>
  );
};

export default Navbar;