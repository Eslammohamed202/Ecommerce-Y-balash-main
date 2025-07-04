"use client";
import React from "react";
import WithdrawForm from "@/components/Withdraw/WithdrawForm";

const WithdrawalPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-Main">Request Withdrawal</h1>
      <WithdrawForm />
    </div>
  );
};

export default WithdrawalPage;
