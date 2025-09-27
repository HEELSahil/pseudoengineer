'use client';

import React from 'react';
import usePageViewLogger from '@components/usePageViewLogger';
import {
  Shield,
  Settings,
  Share2,
  Database,
  ArrowBigRightDash,
  Users,
  RefreshCw,
  Mail,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  usePageViewLogger('/privacy-policy');

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <div className="space-y-2 py-8 md:space-y-5">
        <h1 className="pb-2 text-3xl md:text-5xl font-extrabold lg:font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-blue-500 to-sky-500 animate-text">
          Privacy Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg pt-3">
          Welcome to pseudoEngineer. We respect your privacy and are committed
          to protecting your personal information. This Privacy Policy explains
          how we collect, use, and protect your data when you use our platform.
          This website is operated by pseudoEngineer. Throughout the site, the
          terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to
          pseudoEngineer.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Settings size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              1. Information We Collect
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                <span className="font-semibold">Account Data:</span> We may
                collect your name, email address, and other contact and
                authentication details when you sign up, contact us, or interact
                with our services.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                <span className="font-semibold">Usage Data:</span> We collect
                data on how you use our platform, including pages visited,
                actions performed, and device/browser details.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                <span className="font-semibold">Cookies:</span> We use cookies
                to personalize your experience and analyze traffic.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Database size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              2. How We Use Your Information
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                We use your data to deliver content, save progress, and enhance
                user experience.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                To personalize learning paths and provide tailored content.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                To communicate essential updates and announcements.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                To enhance platform security and prevent abuse.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Share2 size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              3. Third-Party Sharing
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            We do not sell your personal data. We may share information with
            trusted services for analytics, hosting, or communication purposes,
            strictly for improving your experience.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              4. Data Retention & Security
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            Your data is retained only as long as necessary for our services. We
            implement strong security practices, but no system is 100% immune.
            We encourage users to use strong passwords.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              5. Your Rights
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                <span className="font-semibold">Access and Correction:</span> We
                are currently working on an account settings page for users.
                Until then, if you&apos;d like to access or update your personal
                data, please email us at{' '}
                <a
                  href="mailto:contact@pseudoengineer.dev"
                  className="text-sky-500 hover:text-sky-600"
                >
                  contact@pseudoengineer.dev
                </a>
                .
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                <span className="font-semibold">Deletion:</span> You may request
                deletion of your data by contacting us at{' '}
                <a
                  href="mailto:contact@pseudoengineer.dev"
                  className="text-sky-500 hover:text-sky-600"
                >
                  contact@pseudoengineer.dev
                </a>
                .
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowBigRightDash
                size={18}
                className="text-sky-400 mt-1 flex-shrink-0"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                <span className="font-semibold">Opt-Out:</span> You can
                unsubscribe from promotional emails using the unsubscribe link
                or by emailing us.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              6. Children&apos;s Privacy
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            Our platform is not intended for users under the age of 13. We do
            not knowingly collect personal information from children. If we
            discover such data, we will delete it immediately.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <RefreshCw size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              7. Changes to This Privacy Policy
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page, and your continued use of the site signifies
            your acceptance.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              8. Contact Us
            </h2>
          </div>
          <div className="pl-10 text-gray-500 dark:text-gray-400 text-lg">
            <p>
              If you have any questions or concerns, please reach out to us at:
              <br />
              <span className="font-semibold">Email:</span>{' '}
              <a
                href="mailto:contact@pseudoengineer.dev"
                className="text-sky-500 hover:text-sky-600"
              >
                contact@pseudoengineer.dev
              </a>
            </p>
            <p className="mt-4">Thank you for trusting pseudoEngineer.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
