"use client"
import React from 'react'
import DashBoard from '@/components/DashBoard'
import Layout from '@/components/overflow'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <Layout>
      <div className='text-white'>
        <DashBoard/>
      </div>
      <Footer/>
    </Layout>
  )
}

export default page
