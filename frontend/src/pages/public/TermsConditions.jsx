import { Link } from "react-router-dom";
import {
  FileText,
  UserCheck,
  Building2,
  ShieldCheck,
  MessageSquare,
  Tag,
  AlertTriangle,
  Ban,
  Copyright,
  RefreshCw,
  Mail,
} from "lucide-react";

function TermsConditions() {
  const sections = [
    {
      icon: UserCheck,
      title: "1. Acceptance of Terms",
      content: (
        <p>
          By accessing or using Himachali Business, you agree to follow these
          Terms & Conditions and any applicable laws and regulations. If you do
          not agree with these terms, please do not use the platform.
        </p>
      ),
    },
    {
      icon: UserCheck,
      title: "2. User Accounts",
      content: (
        <>
          <p>
            Some features of Himachali Business require you to create an
            account. You are responsible for providing accurate information
            during registration and for keeping your account credentials
            secure.
          </p>

          <p className="mt-4">
            Your registered email address is used as your primary login
            identifier. You should notify us if you believe your account has
            been accessed or used without authorization.
          </p>
        </>
      ),
    },
    {
      icon: Building2,
      title: "3. Business Listings",
      content: (
        <>
          <p>
            Business owners may create and manage business listings on
            Himachali Business. Information submitted for a business listing
            should be accurate, current, and relevant to the business.
          </p>

          <p className="mt-4">
            Business owners are responsible for the information, images,
            services, offers, contact details, and other content they publish
            through their business profile.
          </p>
        </>
      ),
    },
    {
      icon: ShieldCheck,
      title: "4. Business Verification",
      content: (
        <p>
          Himachali Business may provide business verification features.
          Verification does not necessarily guarantee the quality, legality,
          performance, or reliability of a business. Users should make their
          own decisions before purchasing products or services from a listed
          business.
        </p>
      ),
    },
    {
      icon: MessageSquare,
      title: "5. Reviews, Posts and User Content",
      content: (
        <>
          <p>
            Users may be able to submit reviews, posts, comments, photos,
            offers, or other content depending on the features available on
            the platform.
          </p>

          <p className="mt-4">
            You are responsible for ensuring that content you submit is
            truthful, lawful, respectful, and does not violate another
            person's rights.
          </p>

          <p className="mt-4">
            We may remove content that violates these Terms & Conditions,
            applicable law, or the intended use of the platform.
          </p>
        </>
      ),
    },
    {
      icon: Tag,
      title: "6. Offers and Promotions",
      content: (
        <p>
          Businesses may publish offers, discounts, and promotions through
          Himachali Business. The business providing an offer is responsible
          for its terms, availability, accuracy, and fulfillment unless
          explicitly stated otherwise by Himachali Business.
        </p>
      ),
    },
    {
      icon: Ban,
      title: "7. Prohibited Activities",
      content: (
        <>
          <p>You agree not to use Himachali Business to:</p>

          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Provide false or misleading information.</li>
            <li>Impersonate another person or business.</li>
            <li>Publish unlawful, abusive, threatening, or harmful content.</li>
            <li>Upload content that infringes another person's rights.</li>
            <li>Attempt to gain unauthorized access to accounts or systems.</li>
            <li>Abuse, disrupt, or interfere with the operation of the platform.</li>
            <li>Use the platform for fraudulent or deceptive activities.</li>
          </ul>
        </>
      ),
    },
    {
      icon: AlertTriangle,
      title: "8. Third-Party Businesses and Services",
      content: (
        <p>
          Himachali Business provides a platform for discovering local
          businesses and services. We are not necessarily the provider of the
          products or services offered by listed businesses. Any transaction,
          appointment, purchase, or agreement between a user and a business is
          generally between those parties unless Himachali Business explicitly
          states otherwise.
        </p>
      ),
    },
    {
      icon: Copyright,
      title: "9. Intellectual Property",
      content: (
        <p>
          The Himachali Business name, branding, website design, software,
          graphics, and original platform content may be protected by
          applicable intellectual property laws. You may not copy, reproduce,
          modify, distribute, or commercially exploit our protected materials
          without appropriate permission.
        </p>
      ),
    },
    {
      icon: ShieldCheck,
      title: "10. Platform Availability",
      content: (
        <p>
          We aim to keep Himachali Business available and reliable, but we do
          not guarantee that the platform will always be available,
          uninterrupted, secure, or free from errors. We may temporarily
          suspend or modify features for maintenance, security, improvements,
          or other operational reasons.
        </p>
      ),
    },
    {
      icon: AlertTriangle,
      title: "11. Limitation of Responsibility",
      content: (
        <p>
          Information provided by businesses and users may change and may not
          always be accurate or complete. Users should independently verify
          important information before relying on a listing, offer, review,
          contact detail, or other user-provided information.
        </p>
      ),
    },
    {
      icon: RefreshCw,
      title: "12. Changes to These Terms",
      content: (
        <p>
          We may update these Terms & Conditions as Himachali Business
          develops or changes its features and services. Updated terms will be
          published on this page with a revised "Last Updated" date. Continued
          use of the platform after changes are published may constitute
          acceptance of the updated terms.
        </p>
      ),
    },
    {
      icon: Mail,
      title: "13. Contact Us",
      content: (
        <p>
          If you have questions or concerns regarding these Terms & Conditions,
          you can contact the Himachali Business team through the contact
          information provided on the platform.
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
            <FileText size={30} strokeWidth={1.7} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            These terms explain the rules for using Himachali Business and
            help define the responsibilities of users, businesses, and the
            platform.
          </p>

          <p className="mt-3 text-xs font-medium text-slate-400">
            Last Updated: September 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="leading-7 text-slate-600">
            Himachali Business is a platform designed to help users discover
            local businesses, services, offers, and information across
            Himachal Pradesh. These Terms & Conditions govern your use of the
            website and its available features.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            By accessing or using Himachali Business, you acknowledge that you
            have read, understood, and agreed to these terms.
          </p>
        </div>

        {/* Terms Sections */}
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
            to="/privacy-policy"
            className="font-medium text-blue-950 transition hover:text-blue-700"
          >
            ← Privacy Policy
          </Link>
        </div>

      </div>
    </main>
  );
}

export default TermsConditions;
