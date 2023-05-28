import { Disclosure, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', current: true, routeName: '/' },
  { name: 'Autobiography', current: false, routeName: '/bio' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    useNavigate(); //this call is necessary for updating the state of class depending on the active route
    
    function setCurrent(offset) {
        for (var navitem of navigation) {
            navitem.current = false;
        }
        navigation[offset].current = true;
        //console.log(offset, navigation);
    }

    return (
    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                      <Link
                        key={item.name}
                        href={item.routeName}
                        className={classNames(
                          item.current ? 'bg-gray-300 text-black' : 'text-gray-900 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        to={item.routeName}
                        onClick={() => {setCurrent(offset)}}
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
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item, offset) => (
                <Link
                  key={item.name + "_mobile"}
                  href={item.routeName}
                  className={classNames(
                    item.current ? 'bg-gray-300 text-black' : 'text-gray-900 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  to={item.routeName}
                  onClick={() => {setCurrent(offset)}}
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