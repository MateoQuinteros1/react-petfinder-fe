import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type React from "react";
import { Link } from "react-router-dom";
import LogOutDialog from "./LogOutDialog";
import { useState } from "react";
import { useAuthStore } from "../state/authStore";

interface DropDownMenuProps {
  children: React.ReactNode;
}

const DropDownMenu = ({ children }: DropDownMenuProps) => {
  let [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();

  return (
    <div>
      <Menu>
        <MenuButton className="focus:outline-none focus:ring-0">
          {children}
        </MenuButton>
        <MenuItems
          anchor="bottom"
          transition
          className="flex flex-col bg-white border border-gray-400 rounded-lg min-h-15 min-w-40 justify-center origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 mt-2 focus:outline-none"
        >
          <MenuItem>
            <Link
              to="/profile"
              className="flex gap-1.5 hover:bg-gray-100 transition-colors px-2 py-2 cursor-pointer data-focus:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Mi cuenta
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="flex gap-1.5 hover:bg-gray-100 transition-colors px-2 py-2 cursor-pointer data-focus:bg-gray-100 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              Cerrar sesión
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <LogOutDialog
        isOpen={isOpen}
        handleCancel={() => setIsOpen(false)}
        handleAccept={() => {
          logout();
          setIsOpen(false);
        }}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default DropDownMenu;
