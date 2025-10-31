"use client";

import { useRef, useState } from "react";
import { useForgotPasswordMutation, useResendOtpMutation, useVerifyOtpMutation, useVerifyRegisterOtpMutation } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const VerifyRegister = () => {
  const router = useRouter();
  const inputRefs = useRef([]);
  const [verifyOtp] = useVerifyRegisterOtpMutation();
  const [resend] = useResendOtpMutation();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const email = localStorage.getItem("email");

  // Handle OTP input auto focus
  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // allow only numbers
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otpValues.join("");

    if (code.length !== 6) {
      toast.info('Please enter all 6 digits.')
      return;
    }

    try {
      const res = await verifyOtp({ email, code: Number(code) }).unwrap();

      if (res?.success) {
       toast.success(res?.message)
        router.push("/signIn");
      }
    } catch (error) {
     toast.error(error?.data?.message)
    }
  };

  // Resend code
  const handleResend = async () => {
    try {
      if (!email) return Swal.fire("Error", "Email not found in local storage", "error");

      const res = await resend({ email }).unwrap();
      if (res?.success) {
        Swal.fire("Sent!", "A new verification code has been sent to your email.", "success");
      }
    } catch (error) {
      Swal.fire("Error", error?.data?.message || "Failed to resend code", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg lg:p-8 p-4 border">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter the 6-digit code sent to your email
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="bg-transparent text-3xl text-center border rounded border-black md:h-[70px] h-[50px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onInput={(e) => handleInputChange(e, i)}
                  ref={(el) => (inputRefs.current[i] = el)}
                  value={otpValues[i]}
                />
              ))}
          </div>

          <div className="flex justify-between">
            <p className="text-neutral-400">Didn&apos;t receive code?</p>
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-orange-500 hover:underline"
            >
              Resend
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyRegister;
