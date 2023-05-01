"use client";

import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { FaBan, FaChevronDown, FaTrash } from "react-icons/fa";

import { User } from "utils/types";

type Props = {
  participant?: User;
  onRemove: () => void;
  onBan: () => void;
  isAdmin: boolean;
};

export function ParticipantBadge(props: Props) {
  const { participant, isAdmin, onRemove, onBan } = props;
  const badgeClassNames =
    "text-lg font-medium bg-color-1 rounded-full flex items-center justify-between px-4 py-1";
  const adminBadgeClassNames = `${badgeClassNames} hover:bg-opacity-30 transition-colors duration-200}`;
  const sharedButtonClassNames =
    "group flex w-full items-center rounded-md px-2 py-2 transition-colors duration-200";
  const menuItemClassNames =
    "absolute left-0 mt-2 w-48 text-base origin-top-right divide-y rounded-md bg-color-1 shadow-xl";

  if (!isAdmin) {
    return <p className={badgeClassNames}>{participant?.name}</p>;
  }
  return (
    <Menu
      as="div"
      className="inline-block text-left bg-color-1 rounded-full px-3"
    >
      <Menu.Button className={adminBadgeClassNames}>
        {participant?.name}
        <FaChevronDown className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={menuItemClassNames}>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onRemove}
                  className={`${
                    active ? "bg-gray-500/10" : ""
                  } ${sharedButtonClassNames}`}
                >
                  <FaTrash aria-hidden="true" className="mr-2 text-red-500" />
                  Delete
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onBan}
                  className={`${
                    active ? "bg-red-500/40" : ""
                  } ${sharedButtonClassNames}`}
                >
                  <FaBan aria-hidden="true" className="mr-2 text-red-500" />
                  Delete and Ban
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
