import Navbar from '@/components/Navbar/Navbar'
import Form from '@/components/Withdraw/Form'
import Security from '@/components/Withdraw/Security'
import TransactionHistory from '@/components/Withdraw/TransactionHistory'
import WithdrawHeader from '@/components/Withdraw/WithdrawHeader'
import WithDrawHero from '@/components/Withdraw/WithDrawHero'
import React from 'react'

const page = () => {
  return (
    <div>
         <Navbar />
        <WithdrawHeader/>
        <WithDrawHero />
        <Form/>
        <TransactionHistory/>
        <Security />
    </div>
  )
}

export default page