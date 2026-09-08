import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) {
      return;
    }

    const newOtp = [...otp];

    pastedValue.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedValue.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const verificationCode = otp.join("");

    console.log("Verification code:", verificationCode);

    // Backend verification will be connected later.
  };

  const handleResend = () => {
    console.log("Resend verification code");

    // Backend resend-code API will be connected later.
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-950">
            <Mail size={26} strokeWidth={1.8} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-blue-950">
            Verify Your Email
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We've sent a 6-digit verification code to your email address.
          </p>
        </div>

        {/* Verification Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <form onSubmit={handleSubmit}>

            {/* OTP Inputs */}
            <div>
              <label className="block text-center text-sm font-medium text-slate-700">
                Enter verification code
              </label>

              <div className="mt-4 flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(event) =>
                      handleChange(event.target.value, index)
                    }
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    onPaste={handlePaste}
                    className="h-12 w-11 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-blue-950 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-100 sm:h-14 sm:w-12"
                    aria-label={`Verification digit ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={otp.join("").length !== 6}
              className="mt-7 w-full rounded-xl bg-blue-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verify Email
            </button>
          </form>

          {/* Resend */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              className="mt-1 text-sm font-semibold text-blue-900 hover:text-blue-700"
            >
              Resend Code
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-950"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}

export default VerifyEmail;
