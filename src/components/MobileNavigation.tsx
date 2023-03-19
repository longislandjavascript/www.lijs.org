"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { HeaderLogo } from "./HeaderLogo";
import { NavigationMenu } from "components/NavigationMenu";
import { usePathname } from "next/navigation";

const iconButtonClassNames =
  "text-3xl text-primary p-2 rounded-full hover:bg-gray-500/10 transition-colors ease-in-out";

export const MobileNavigation = () => {
  const pathname = usePathname();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="md:hidden p-4 sticky top-0 z-10 border-b-2 border-color flex items-center justify-between surface">
        <HeaderLogo />
        <button
          type="button"
          onClick={openModal}
          aria-label="Site Navigation"
          className={iconButtonClassNames}
        >
          <FaBars />
        </button>
      </div>

      <Transition appear={true} show={isOpen}>
        <Dialog className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-scroll w-screen h-screen">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-screen h-screen transform overflow-scroll surface text-left align-middle transition-all">
                  <section className="w-full text-right flex items-center sticky top-0 surface border-b border-color p-4">
                    <HeaderLogo />
                    <button
                      onClick={closeModal}
                      className={iconButtonClassNames}
                    >
                      <FaTimes />
                    </button>
                  </section>
                  <div className="pb-[150px]">
                    <NavigationMenu />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
