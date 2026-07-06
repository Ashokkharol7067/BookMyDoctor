import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 '>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* .... left section .... */}
        <div>
            <img className='mb-5 w-40' src={assets.logo1} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Book appointments with qualified doctors in just a few clicks. Prescripto helps you find the right specialist, schedule visits, and access quality healthcare effortlessly.</p>
        </div>

        {/* .... centre section .... */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col text-gray-600 gap-2'>
                <li>Home</li>
                <li>About</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        {/* .... right section .... */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        </div>
      </div>

      {/* --- copyright ---- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2026 InstaConsult - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
