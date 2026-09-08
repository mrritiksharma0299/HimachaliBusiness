import { Link } from "react-router-dom";
import {
  ShieldCheck,
  User,
  Database,
  Lock,
  Cookie,
  Share2,
  UserCheck,
  Mail,
} from "lucide-react";

function PrivacyPolicy() {
  const sections = [
    {
      icon: User,
      title: "1. Information We Collect",
      content: (
        <>
          <p>
            When you use Himachali Business, we may collect information that
            you provide directly to us, as well as information generated when
            you use our platform.
          </p>

          <h3 className="mt-5 font-semibold text-blue-950">
            Account Information
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Full name</li>
            <li>Email address</li>
            <li>Account type</li>
            <li>Profile picture, if provided</li>
            <li>Account creation date</li>
          </ul>

          <h3 className="mt-5 font-semibold text-blue-950">
            Business Information
          </h3>

          <p className="mt-3">
            Business owners may provide information such as business name,
            category, description, location, contact details, photos, services,
            offers, posts, and other information needed to create and manage a
            business listing.
          </p>
        </>
      ),
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content: (
        <p>
          We may use the information we collect to create and manage your
          account, provide and improve our services, display business listings,
          process business verification, communicate with you about your
          account, maintain platform security, prevent misuse, and provide
          relevant features and functionality.
        </p>
      ),
    },
    {
      icon: Lock,
      title: "3. How We Protect Your Information",
      content: (
        <p>
          We take reasonable technical and organizational measures to protect
          your information from unauthorized access, alteration, disclosure,
          or destruction. However, no online service can guarantee complete
          security of information transmitted or stored electronically.
        </p>
      ),
    },
    {
      icon: UserCheck,
      title: "4. Your Account",
      content: (
        <>
          <p>
            You are responsible for keeping your account credentials
            confidential and for notifying us if you believe your account has
            been accessed without authorization.
          </p>

          <p className="mt-4">
            Your registered email address is used as your primary login
            identifier. Certain account information may be editable through
            your profile, subject to the functionality provided by Himachali
            Business.
          </p>
        </>
      ),
    },
    {
      icon: Share2,
      title: "5. Information Shared on the Platform",
      content: (
        <p>
          Information that you choose to publish as part of a business listing,
          post, offer, review, or other public platform feature may be visible
          to other users. Please avoid publishing information that you do not
          want to make publicly available.
        </p>
      ),
    },
    {
      icon: Cookie,
      title: "6. Cookies and Similar Technologies",
      content: (
        <p>
          Himachali Business may use cookies, local storage, or similar
          technologies to maintain sessions, remember preferences, improve
          functionality, and understand how the platform is used. The specific
          technologies used may change as the platform develops.
        </p>
      ),
    },
    {
      icon: ShieldCheck,
      title: "7. Third-Party Services",
      content: (
        <p>
          Certain features may rely on third-party services, such as mapping,
          hosting, authentication, analytics, communication, or other
          infrastructure providers. Those services may process information
          according to their own privacy policies and terms.
        </p>
      ),
    },
    {
      icon: User,
      title: "8. Children's Privacy",
      content: (
        <p>
          Himachali Business is not intended to knowingly collect personal
          information from children without appropriate consent. If you believe
          that a child has provided personal information to us, please contact
          us so that we can review and take appropriate action.
        </p>
      ),
    },
    {
      icon: Mail,
      title: "9. Contact Us",
      content: (
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or the handling of your information, you can contact the
          Himachali Business team through the contact information provided on
          the platform.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-950">
            <ShieldCheck size={30} strokeWidth={1.7} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Your privacy matters to us. This policy explains what information
            Himachali Business may collect, how we use it, and how we work to
            protect it.
          </p>

          <p className="mt-3 text-xs font-medium text-slate-400">
            Last Updated: September 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="leading-7 text-slate-600">
            Himachali Business is a platform designed to help people discover
            local businesses, services, offers, and information across
            Himachal Pradesh. This Privacy Policy describes how information may
            be collected and used when you access or use our website and
            services.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            By using Himachali Business, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="mt-6 space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-blue-950">
                      {section.title}
                    </h2>

                    <div className="mt-4 text-sm leading-7 text-slate-600">
                      {section.content}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Changes */}
        <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-blue-950">
            10. Changes to This Privacy Policy
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            We may update this Privacy Policy from time to time as Himachali
            Business develops new features or changes how information is
            handled. Any updated version will be made available on this page
            with a revised "Last Updated" date.
          </p>
        </section>

        {/* Back Links */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
          <Link
            to="/"
            className="font-medium text-slate-500 transition hover:text-blue-950"
          >
            ← Back to Home
          </Link>

          <span className="hidden text-slate-300 sm:block">•</span>

          <Link
            to="/terms-and-conditions"
            className="font-medium text-blue-950 transition hover:text-blue-700"
          >
            Terms & Conditions →
          </Link>
        </div>

      </div>
    </main>
  );
}

export default PrivacyPolicy;

