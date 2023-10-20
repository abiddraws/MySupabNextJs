"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function EmailChange() {
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { data, error } = await supabase.auth.updateUser({ email });

    if (error) {
      console.log("Error from updateEmail ", JSON.stringify(error));
    } else {
      console.log("Email updation success ", JSON.stringify(data));
      setOtpSent(true);
    }
  };

  const handleVerifyOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Call receives...");
    e.preventDefault();
    e.stopPropagation();

    const { data, error } = await supabase.auth.verifyOtp({
      token: otp,
      type: "email_change",
      email,
    });

    if (error) {
      console.log(JSON.stringify(error));
    }
    if (data?.user) {
      alert(`OTP ${otp} verified successfully!`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">
        {!otpSent ? "Enter New Email" : "Enter OTP"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600">Email Address:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {!otpSent ? (
        <button
          onClick={handleSendOTP}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Send OTP
        </button>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-600">Enter OTP:</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            onClick={handleVerifyOTP}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}
