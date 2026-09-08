import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";
import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Pencil,
  Save,
  X,
  LogOut,
  ArrowLeft,
} from "lucide-react";

function UserProfile() {
  const {
    user,
    logout,
    loading,
    updateUser,
  } = useAuth();

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
    }
  }, [user]);

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    const trimmedName = fullName.trim();

    if (!trimmedName) {
      setError("Full name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.patch("/auth/me/", {
        full_name: trimmedName,
      });

      updateUser(response.data);

      setSuccess("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);

      if (err.response?.data?.full_name) {
        setError(err.response.data.full_name[0]);
      } else {
        setError("Unable to update your profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFullName(user?.full_name || "");
    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading your profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-blue-950">
              Unable to load profile
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const accountType =
    user.account_type === "business"
      ? "Business"
      : "Customer";

  const memberSince = user.date_joined
    ? new Date(user.date_joined).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">
            My Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage your personal account information.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Small Blue Top Section */}
          <div className="h-16 bg-blue-950 sm:h-20" />

          {/* White Main Section */}
          <div className="relative bg-white px-6 pb-7 sm:px-8">

            <div className="-mt-9 flex flex-col gap-5 sm:-mt-11 sm:flex-row sm:items-end sm:justify-between">

              {/* Profile Identity */}
              <div className="flex items-end gap-4">

                {/* Profile Picture */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-100 text-blue-950 shadow-md sm:h-24 sm:w-24">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.full_name || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      size={40}
                      strokeWidth={1.6}
                    />
                  )}
                </div>

                {/* Name */}
                <div className="pb-1">
                  <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
                    {user.full_name || "User"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {accountType} Account
                  </p>
                </div>

              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setIsEditing(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-950 transition hover:bg-slate-50"
                >
                  <Pencil size={16} strokeWidth={1.8} />
                  Edit Profile
                </button>
              )}

            </div>

          </div>

          {/* Small Blue Bottom Section */}
          <div className="h-3 bg-blue-950" />

        </div>

        {/* Success Message */}
        {success && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Personal Information */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-950">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your account information and profile details.
            </p>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile}>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    strokeWidth={1.8}
                  />

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    strokeWidth={1.8}
                  />

                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-500"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Your login email cannot be changed.
                </p>
              </div>

              {/* Account Type */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Account Type
                </label>

                <div className="relative">
                  <ShieldCheck
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    strokeWidth={1.8}
                  />

                  <input
                    type="text"
                    value={accountType}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-500"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Account type cannot be changed from your profile.
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} strokeWidth={1.8} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <X size={17} strokeWidth={1.8} />
                  Cancel
                </button>

              </div>

            </form>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">

              {/* Full Name */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-950">
                    <User size={19} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Full Name
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {user.full_name || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-950">
                    <Mail size={19} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Email Address
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                      {user.email || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Type */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-950">
                    <ShieldCheck size={19} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Account Type
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {accountType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-950">
                    <CalendarDays size={19} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Member Since
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {memberSince}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Account Actions */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold text-blue-950">
            Account
          </h2>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
              Back to Home
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} strokeWidth={1.8} />
              Logout
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

export default UserProfile;
