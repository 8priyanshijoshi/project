import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
        <div className='text-2xl text-center border-t pt-8'>
            <Title text1={'ABOUT'} text2={'US'}/>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium Minus voluptatibus reiciendis veniam error velit fugit nam! Cumque facilis sunt dolor in impedit?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium illum commodi nihil molestias omnis voluptate quaerat? Minus voluptatibus reiciendis veniam error velit fugit nam!</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  Ea dolorem doloremque voluptates quos, nesciunt debitis commodi blanditiis distinctio eius dicta.</p>
          </div>
        </div>

        <div className='text-1xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-1xl'>Quality Assurance:</b>
                <p className='text-gray-600'>Quod earum voluptas dolores architecto saepe, mollitia esse doloribus commodi impedit sapiente. Expedita.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-1xl'>Convenience:</b>
                <p className='text-gray-600'>Quod earum voluptas dolores architecto saepe, mollitia esse doloribus commodi impedit sapiente. Expedita.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-1xl'>Exceptional Customer Service:</b>
                <p className='text-gray-600'>Quod earum voluptas dolores architecto saepe, mollitia esse doloribus commodi impedit sapiente. Expedita.</p>
            </div>
        </div>

        <NewsLetter/>

    </div>
  )
}

export default About
