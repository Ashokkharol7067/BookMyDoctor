import React from 'react'
import { assets } from '../assets/assets'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6'>

      <div className='text-center pt-10 sm:pt-14'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800'>
          Contact Us
        </h1>

        <p className='mt-3 text-sm sm:text-base text-gray-500'>
          Have questions or need assistance? We're here to help.
        </p>
      </div>

      <div className='mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>

        <div className='flex justify-center'>
          <img
            className='w-full max-w-md object-contain'
            src={assets.chatgpt1}
            alt="Doctor helping a patient"
          />
        </div>

        <div className='space-y-7'>

          <div>
            <h2 className='text-xl font-semibold text-gray-800'>
              Get in Touch
            </h2>

            <p className='mt-2 text-gray-500 leading-7'>
              Our support team is here to help you with appointment booking,
              cancellations, payment issues, and any other questions related
              to our services.
            </p>
          </div>

          <div className='border-b border-gray-200 pb-5'>
            <p className='font-medium text-gray-800'>Email</p>
            <p className='mt-1 text-gray-500'>
              ashokkharol8959@gmail.com
            </p>
          </div>

          <div>
            <p className='font-medium text-gray-800'>Support Hours</p>
            <p className='mt-1 text-gray-500'>Monday - Saturday</p>
            <p className='text-gray-500'>9:00 AM - 8:00 PM</p>
          </div>

        </div>

      </div>

      <div className='max-w-2xl mx-auto mt-14 mb-20'>
        <div className='text-center mb-7'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Send Us a Message
          </h2>

          <p className='mt-2 text-sm text-gray-500'>
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <ContactForm />
      </div>

    </div>
  )
}

export default Contact