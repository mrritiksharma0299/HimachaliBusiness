import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Store,
} from "lucide-react";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountType, setAccountType] = useState("customer");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register/", {
        full_name: fullName.trim(),
        email: email.trim(),
        account_type: accountType,
        password,
      });

      setSuccess(
        "Account created successfully. Please log in to continue."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Registration failed:", err);

      const responseData = err.response?.data;

      if (responseData) {
        if (responseData.email) {
          setError(responseData.email[0]);
        } else if (responseData.full_name) {
          setError(responseData.full_name[0]);
        } else if (responseData.account_type) {
          setError(responseData.account_type[0]);
        } else if (responseData.password) {
          setError(responseData.password[0]);
        } else if (responseData.detail) {
          setError(responseData.detail);
        } else {
          setError("Unable to create your account. Please try again.");
        }
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Join Himachali Business and discover local businesses and
            services.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {success && (
            <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="name"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-950 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-950 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Account Type
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Customer */}
                <button
                  type="button"
                  onClick={() => setAccountType("customer")}
                  className={`rounded-xl border p-4 text-left transition ${
                    accountType === "customer"
                      ? "border-blue-950 bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        accountType === "customer"
                          ? "bg-blue-950 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <User size={19} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-950">
                        Customer
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Explore & connect
                      </p>
                    </div>
                  </div>
                </button>

                {/* Business Owner */}
                <button
                  type="button"
                  onClick={() => setAccountType("business")}
                  className={`rounded-xl border p-4 text-left transition ${
                    accountType === "business"
                      ? "border-blue-950 bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        accountType === "business"
                          ? "bg-blue-950 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Store size={19} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-950">
                        Business Owner
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        List your business
                      </p>
                    </div>
                  </div>
                </button>

              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-950 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.8} />
                  ) : (
                    <Eye size={18} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-950 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} strokeWidth={1.8} />
                  ) : (
                    <Eye size={18} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) =>
                  setTermsAccepted(event.target.checked)
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-950 focus:ring-blue-200"
              />

              <label
                htmlFor="terms"
                className="text-xs leading-5 text-slate-500"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-medium text-blue-900 hover:text-blue-700"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="font-medium text-blue-900 hover:text-blue-700"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-900 hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Register;
