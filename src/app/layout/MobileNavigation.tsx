"use client";

import { Fragment, useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

import { IconButton } from "components/IconButton";

import { HeaderLogo } from "./HeaderLogo";
import { NavigationMenu } from "./NavigationMenu";
import ThemeSwitch from "./ThemeSwitch";

export const MobileNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="md:hidden p-4 sticky top-0 z-10 border-b-2 border-color-1 flex items-center justify-between surface">
        <HeaderLogo />

        <ThemeSwitch />

        <IconButton
          label="Menu"
          type="button"
          onClick={openModal}
          aria-label="Site Navigation"
        >
          <FaBars className="text-3xl" />
        </IconButton>
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
                <Dialog.Panel className="w-screen h-screen transform overflow-scroll bg-color-1 text-left align-middle transition-all">
                  <section className="w-full text-right flex items-center sticky top-0 bg-color-1 border-b border-color-1 p-4 justify-between">
                    <HeaderLogo />
                    <IconButton label="Menu" onClick={closeModal}>
                      <FaTimes className="text-3xl" />
                    </IconButton>
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
