import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserProfile from "./profile/UserProfile";
import BusinessProfile from "./profile/BusinessProfile";

function Profile() {
  const { user, isAuthenticated, loading } = useAuth();

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

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-blue-950">
              Please log in to view your profile
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              You need to be logged in to access your profile.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (user.account_type === "business") {
    return <BusinessProfile />;
  }

  return <UserProfile />;
}

export default Profile;