import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { HeaderLogo } from "./HeaderLogo";
import { NavigationMenu } from "components/NavigationMenu";

export const MobileNavigation = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="block md:hidden relative p-2">
        <HeaderLogo />
        <button
          type="button"
          onClick={openModal}
          aria-label="Site Navigation"
          className="p-2 rounded-full hover:bg-gray-500/10 transition-colors ease-in-out absolute right-4 top-4"
        >
          <FaBars className="text-3xl text-primary" />
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
                <Dialog.Panel className="w-screen h-screen transform overflow-scroll surface text-left align-middle shadow-xl transition-all p-2">
                  <section className="w-full text-right flex items-center">
                    <HeaderLogo />
                    <button
                      onClick={closeModal}
                      className="text-3xl text-sky-700 rounded-full p-2 hover:bg-gray-500/10 focus:bg-gray-500/10 m-2 ring-0 outline-0"
                    >
                      <FaTimes />
                    </button>
                  </section>

                  <NavigationMenu />

                  <section className="w-full text-center mt-8">
                    <button
                      onClick={closeModal}
                      className="m-4 p-2 border-2 border-blue-500 text-blue-500 font-medium rounded-lg w-44"
                    >
                      Close
                    </button>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
