'use client';

import React from 'react';
import usePageViewLogger from '@components/usePageViewLogger';
import {
  Shield,
  FileText,
  BookOpen,
  Download,
  AlertTriangle,
  Copyright,
  Scale,
  RefreshCw,
  Mail,
  Link,
  Globe,
  Edit3,
} from 'lucide-react';

export default function TermsAndConditionsPage() {
  usePageViewLogger('/terms-and-conditions');

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <div className="space-y-2 py-8 md:space-y-5">
        <h1 className="pb-2 text-3xl md:text-5xl font-extrabold lg:font-extrabold bg-gradient-to-r bg-clip-text text-transparent from-sky-500 via-blue-500 to-sky-500 animate-text">
          Terms and Conditions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg pt-3">
          Welcome to pseudoEngineer. These Terms and Conditions govern your use
          of our website and services. By accessing or using our platform, you
          agree to these terms. This website is operated by pseudoEngineer.
          Throughout the site, the terms &quot;we&quot;, &quot;us&quot; and
          &quot;our&quot; refer to pseudoEngineer.
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              1. Acceptance of Terms
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            By accessing or using pseudoEngineer&quot;s website, you acknowledge
            that you have read, understood, and agree to be bound by these
            Terms. If you do not agree with any part of these Terms, you must
            not use our website. We reserve the right to modify these Terms at
            any time without notice. Your continued use of the website following
            any changes constitutes acceptance of those changes.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              2. Content and Services
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              pseudoEngineer provides educational resources, tutorials, guides,
              and source code for learning purposes. All content on our website
              is for informational and educational purposes only. While we
              strive for accuracy, we do not guarantee the completeness or
              reliability of our content.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Download size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              3. Downloadable Resources
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              pseudoEngineer offers downloadable resources including but not
              limited to source code, notes, and tutorial materials. These
              materials are provided for your personal educational use only. By
              downloading these resources, you agree to the following:
            </p>
            <div className="space-y-3 pl-5">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  <span className="font-semibold">No Commercial Use:</span> You
                  may not use our resources for commercial purposes without
                  explicit written permission.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  <span className="font-semibold">No Modification:</span> You
                  may not alter, edit, or modify our resources for
                  redistribution.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  <span className="font-semibold">No Redistribution:</span> You
                  may not redistribute our resources, in original or modified
                  form, without prior written consent.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  <span className="font-semibold">Attribution:</span> If you use
                  our resources in your projects, proper attribution to
                  pseudoEngineer is required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Copyright size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              4. Intellectual Property Rights
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              All content on pseudoEngineer, including but not limited to text,
              graphics, logos, icons, images, audio clips, digital downloads,
              data compilations, and software, is the property of pseudoEngineer
              or its content suppliers and is protected by international
              copyright laws.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              The compilation of all content on this site is the exclusive
              property of pseudoEngineer. You may not extract or reuse any
              content without our express written permission.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Edit3 size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              5. Prohibited Activities
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              You are strictly prohibited from:
            </p>
            <div className="space-y-3 pl-5">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Modifying, adapting, or altering any content from
                  pseudoEngineer for commercial gain.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Selling, licensing, or exploiting any content or resources
                  from our website for commercial purposes.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Rebranding or representing our content as your own.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Creating derivative works based on our content without
                  permission.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Using any automated means to access, scrape, or index our
                  website.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Scale size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              6. Enforcement and Legal Action
            </h2>
          </div>
          <div className="space-y-3 pl-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              pseudoEngineer takes intellectual property rights seriously. We
              actively monitor for misuse of our content. Violations of these
              Terms may result in:
            </p>
            <div className="space-y-3 pl-5">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Formal cease and desist notices.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Legal action to protect our intellectual property.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={18}
                  className="text-amber-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Claims for damages and legal costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Link size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              7. Third-Party Links
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            Our website may contain links to third-party websites. We are not
            responsible for the content or practices of any linked websites. We
            provide these links only as a convenience. The inclusion of any link
            does not imply endorsement by pseudoEngineer.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              8. Disclaimer of Warranties
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            Our content and services are provided &quot;as is&quot; without any
            warranties, express or implied. pseudoEngineer does not warrant that
            our website will be uninterrupted or error-free, that defects will
            be corrected, or that our website or the server that makes it
            available are free of viruses or other harmful components.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Globe size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              9. Governing Law
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            These Terms shall be governed by and construed in accordance with
            the laws of United States of America, without regard to its conflict
            of law provisions. Any dispute arising under these Terms shall be
            subject to the exclusive jurisdiction of the courts in United
            States.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <RefreshCw size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              10. Changes to Terms
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg pl-10">
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting on our website. Your continued
            use of the website after any changes indicates your acceptance of
            the revised Terms.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail size={24} className="text-sky-500 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
              11. Contact Us
            </h2>
          </div>
          <div className="pl-10 text-gray-500 dark:text-gray-400 text-lg">
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <span className="font-semibold">Email:</span>{' '}
              <a
                href="mailto:contact@pseudoengineer.dev"
                className="text-sky-500 hover:text-sky-600"
              >
                contact@pseudoengineer.dev
              </a>
            </p>
            <p className="mt-4">Thank you for using pseudoEngineer.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
