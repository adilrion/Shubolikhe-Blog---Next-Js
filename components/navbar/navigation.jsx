import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Blog", href: "/blogs", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Contact", href: "/contact", current: false },
  ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between sm:h-24 md:h-44">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center py-2 rounded-md text-gray-400">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6 text-[#b70038]" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6 text-[#b70038]" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="mx-auto">
              <h1 className="text-3xl md:text-5xl md:pb-5 py-2 text-center font-light text-[#b70038] tracking-wide">
                    Shubolikhe
                  </h1>
                <div className="hidden sm:ml-6 md:ml-0 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current
                              ? " text-[#222] uppercase"
                              : "  hover:text-[#b70038] uppercase",
                            "px-3 py-2 rounded-md text-md font-medium uppercase"
                          )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
             
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="Link"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-[#222]"
                      : "hover:text-[#b70038] uppercase",
                    "block px-3 py-2 rounded-md text-base font-medium uppercase"
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}