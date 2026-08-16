import React from 'react'
import { assets } from '../assets/assets'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONTACT <span className='text-gray-700 font-semibold'>US</span>
        </p>
        <p className='text-sm text-gray-500 mt-3'>
          Have questions or need assistance? We're here to help.
        </p>
      </div>

      <div className='my-12 flex flex-col md:flex-row items-center justify-center gap-12 mb-28'>

        <img
          className='w-full md:max-w-[400px] rounded-lg'
          src={assets.chatgpt}
          alt="Contact"
        />

        <div className='flex flex-col gap-6 text-gray-600 max-w-md'>

          <div>
            <h2 className='text-xl font-semibold text-gray-800'>
              Customer Support
            </h2>
            <p className='mt-2'>
              Our support team is available to assist you with appointment
              booking, cancellations, payment issues, and any technical
              problems.
            </p>
          </div>

          <div>
            <h3 className='font-semibold text-gray-800'>📧 Email</h3>
            <p>ashokkharol8959@gmail.com</p>
          </div>

          <div>
            <h3 className='font-semibold text-gray-800'>🕒 Support Hours</h3>
            <p>Monday - Saturday</p>
            <p>9:00 AM - 8:00 PM</p>
          </div>

          <ContactForm />

        </div>

      </div>

    </div>
  )
}

export default Contact