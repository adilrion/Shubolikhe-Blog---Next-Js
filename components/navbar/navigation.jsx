import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SearchBar from "../../lib/searchBar";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Blog", href: "/blogs", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="py-2 px-2 sm:px-3 md:px-5 lg:px-52 ">
            <div className="sm:h-24 md:h-36">
              {/* Mobile menu */}
              <div className="flex w-full items-center overflow-hidden relative">
                <div className="sm:hidden absolute left-0 top-2/4 -translate-y-2/4 ">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center py-2 rounded-md text-gray-400">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6 text-[#b70038]"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6 text-[#b70038]"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <h1 className="text-3xl md:text-5xl md:pb-5 py-2 text-center font-light text-[#b70038] tracking-wide inline-flex w-full justify-center md:hidden">
                  Shubolikhe
                </h1>
                <div className="absolute right-0 top-2/4  -translate-y-2/4 md:hidden">
                  {" "}
                  <SearchBar></SearchBar>
                </div>
              </div>

              {/* laptop menu */}
              <div>
                <h1 className="text-3xl md:text-5xl md:pb-5 py-2 text-center font-light text-[#b70038] tracking-wide  hidden md:block">
                  Shubolikhe
                </h1>
                <div className="w-full md:flex justify-between items-center hidden md:block">
                  <div className="flex justify-between w-full items-center">
                    <div className="hidden sm:ml-6 md:ml-0 sm:block ">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <Link
                            id="RouterNavLink"
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? " text-[#222] uppercase"
                                : "  hover:text-[#b70038] uppercase",
                              "px-3 first:pl-0 py-2 rounded-md text-md font-medium uppercase"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <SearchBar></SearchBar>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-[#222]"
                      : "hover:text-[#b70038] uppercase",
                    "block px-3 py-2 rounded-md text-base font-medium uppercase"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <Disclosure.Button>{item.name}</Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
