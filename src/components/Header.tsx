import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import LogOutDialog from "./LogOutDialog";
import { useAuthStore } from "../state/authStore";
import { useUserStore } from "../state/userStore";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const { userData, isLoadingData } = useUserStore();

  if (isLoadingData) {
    return (
      <header className="bg-white border-b border-gray-100 h-22 lg:h-24 flex justify-between items-center px-5 lg:justify-around">
        <div className="h-10 w-30 animate-pulse rounded-lg bg-slate-400 lg:w-40" />
        <div className="min-h-7 w-140 animate-pulse justify-around hidden lg:flex items-center bg-slate-400 rounded-lg 2xl:w-230"></div>
        <div className="h-8 w-10 animate-pulse rounded-lg bg-slate-400 lg:rounded-full lg:size-10" />
      </header>
    );
  }
  return (
    <header className="bg-white border-b border-gray-100">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              alt="Logo de PetFinder"
              src="/imagotipo huella pf.svg"
              className="h-10 w-auto lg:h-12"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon
              aria-label="Abrir menú"
              aria-hidden="true"
              className="size-6 cursor-pointer"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/lostpets"
            className="text-base/6 font-semibold text-gray-900 hover:text-tropical-rain-forest-800"
          >
            Explorar
          </Link>
          <Link
            to="/profile#mis-mascotas"
            className="text-base/6 font-semibold text-gray-900 hover:text-tropical-rain-forest-800"
          >
            Mis mascotas
          </Link>
          <Link
            to="/reportpet"
            className="text-base/6 font-semibold text-gray-900 hover:text-tropical-rain-forest-800"
          >
            Reportar mascota
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <DropDownMenu>
              <img
                src={userData?.image_url}
                className="inline-block size-10 rounded-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              />
            </DropDownMenu>
          ) : (
            <Link
              to="/login"
              className="text-base/6 font-semibold text-gray-900 hover:text-tropical-rain-forest-800"
            >
              Iniciar sesión <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
        transition
      >
        <div className="fixed inset-0 z-50 bg-black/20 transition-opacity duration-300 ease-out data-closed:opacity-0" />
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#F5FFFD] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition duration-300 ease-out data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img src="/huella.svg" className="h-9 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="size-6 cursor-pointer" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  to="/"
                  className="-mx-3 flex gap-1.5 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-mint w-full"
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
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  Inicio
                </Link>
                <Link
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 flex gap-1.5 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-mint w-full"
                  to="/lostpets"
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  Explorar
                </Link>
                <Link
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  to="/profile#mis-mascotas"
                  className="-mx-3 flex gap-1.5 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-mint w-full"
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Mis mascotas
                </Link>
                <Link
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  to="/reportpet"
                  className="-mx-3 flex gap-1.5 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-mint w-full"
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
                      d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                    />
                  </svg>
                  Reportar mascota
                </Link>
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex gap-2.5 mb-4">
                      <img
                        src={userData?.image_url}
                        className="inline-block size-12 rounded-full"
                      />
                      <h1 className="text-lg font-bold self-center">
                        {userData?.name}
                      </h1>
                    </div>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to="/profile"
                      className="-mx-3 flex gap-1.5 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-mint w-full"
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
                    <button
                      onClick={() => {
                        setDialogIsOpen(true);
                      }}
                      className="-mx-3 flex gap-1.5 rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-mint cursor-pointer w-full"
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
                  </div>
                ) : (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/login"
                    className="-mx-3 flex gap-1.5 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-mint"
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
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                      />
                    </svg>
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <LogOutDialog
        isOpen={dialogIsOpen}
        handleCancel={() => setDialogIsOpen(false)}
        handleAccept={() => {
          logout();
          setDialogIsOpen(false);
        }}
        handleClose={() => setDialogIsOpen(false)}
      />
    </header>
  );
}
