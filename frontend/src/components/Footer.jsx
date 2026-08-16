import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const companyLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy-policy" },
]

const Footer = () => {
  return (
    <div className='md:mx-10'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo1} alt="Logo" />

          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Book appointments with qualified doctors in just a few clicks.
            BookMyDoctor helps you find the right specialist, schedule visits,
            and access quality healthcare effortlessly.
          </p>
        </div>

        {/* Company Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>

          <ul className='flex flex-col gap-3'>
            {companyLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-600'
                    } hover:text-primary transition-colors duration-300`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

          <div className='flex flex-col gap-3 text-gray-600'>
            <p>ashokkharol8959@gmail.com</p>
            <p>India</p>
            <p> Mon - Sat (9:00 AM - 8:00 PM)</p>
          </div>
        </div>

      </div>

      <hr />

      <p className='py-5 text-sm text-center text-gray-500'>
        Copyright © 2026 BookMyDoctor. All Rights Reserved.
      </p>

    </div>
  )
}

export default Footer