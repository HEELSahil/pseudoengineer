'use client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const AccordionSection = ({ title, totalCount, children }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`w-full rounded-sm mb-4 transition-shadow duration-300
            ${
              open
                ? 'shadow-md dark:shadow-lg'
                : 'hover:shadow-sm dark:hover:shadow-zinc-800'
            }
            border border-t-4 border-t-emerald-500 dark:border-zinc-700
            bg-white dark:bg-zinc-900 text-black dark:text-white`}
        >
          <DisclosureButton
            className={`flex justify-between w-full px-4 py-3 text-left text-base font-medium focus:outline-none 
            ${open ? '' : 'border-b border-gray-200 dark:border-zinc-700'}`}
          >
            {/* Title */}
            <span
              className={`${
                open ? 'text-emerald-600 dark:text-emerald-500' : ''
              }`}
            >
              {title}
            </span>

            {/* Count + Chevron */}
            <span className="flex items-center gap-2">
              <span className="rounded-md bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-white">
                {totalCount}
              </span>
              <span
                className={`rounded-md p-1.5 transition-all duration-200 border ${
                  open
                    ? 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-600 dark:border-emerald-500'
                    : 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-800'
                }`}
              >
                <ChevronDownIcon
                  className={`h-4 w-4 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </span>
            </span>
          </DisclosureButton>

          <DisclosurePanel className="px-4 pb-4 pt-2 text-sm text-gray-600 dark:text-gray-300">
            {children}
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

export default AccordionSection;
