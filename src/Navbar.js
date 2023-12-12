import { Disclosure, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', routeName: '/' },
  { name: 'Blog', routeName: '/blog' },
  { name: 'Autobiography', routeName: '/bio' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(props) {
  useNavigate(); //this call is necessary for updating the state of class depending on the active route
  let current = props.fieldValue;
  const toggleDarkMode = props.toggleDarkMode;

  return (
    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
          <div className="container mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item, offset) => (
                      <>
                        {offset > 0 && (
                          <div className="border-l-2 border-gray-300" key={"clause_i_" + offset}></div>
                        )}
                        <Link
                          key={item.name + "_" + offset}
                          href={item.routeName}
                          className={classNames(
                            current === item.name ? 'bg-gray-700 text-white dark:bg-gray-900 hover:bg-gray-500 dark:hover:bg-gray-200 dark:hover:text-gray-800' : 'text-gray-900 hover:bg-gray-400 bg-gray-200',
                            'bg-gray-100 rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={current ? 'page' : undefined}
                          to={item.routeName}
                        >
                          {item.name}
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
                <div className="ml-auto px-3 py-3 text-sm font-medium bg-gray-200 hover:bg-gray-400 dark:bg-gray-900 rounded-xl dark:hover:bg-gray-500" onClick={toggleDarkMode}>
                  <button type="button" className="h-full w-full dark:block hidden hs-dark-mode group flex items-center text-gray-600 font-medium dark:text-gray-400" data-hs-theme-click-value="dark">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  </button>
                  <button type="button" className="h-full w-full dark:hidden block hs-dark-mode group flex items-center text-gray-600 font-medium dark:text-gray-400" data-hs-theme-click-value="light">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 8a2 2 0 1 0 4 4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item, offset) => (
                <Link
                  key={item.name + "_mobile"}
                  href={item.routeName}
                  className={classNames(
                    current === item.name ? 'bg-gray-200 text-white dark:bg-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-800' : 
                    'text-gray-900 hover:bg-gray-100 bg-gray-400',
                    'block rounded-md px-3 py-3 text-base font-medium'
                  )}
                  aria-current={current ? 'page' : undefined}
                  to={item.routeName}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}