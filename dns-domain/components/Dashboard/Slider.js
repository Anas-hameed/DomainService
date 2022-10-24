import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useKeycloak } from "@react-keycloak/ssr";
import { removeToken } from "../../utils/auth";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function Slider({ open, setOpen, closeX }) {
  const { t, lang } = useTranslation("common");
  const { keycloak } = useKeycloak();

  function logoutUser() {
    if (keycloak) {
      removeToken();
      window.location.href = keycloak.createLogoutUrl({
        redirectUri: window.location.origin + "/" + lang,
      });
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none  inset-x-0 bottom-0 top-0 w-full flex ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto z-[100]  w-full bg-[#fafafa]">
                  <div className="flex h-[100vh] flex-col w-full overflow-y-auto  bg-white shadow-xl">
                    <div>
                      <div className="flex justify-end">
                        <a
                          onClick={closeX}
                          className="cursor-pointer text-[1.9em] text-dark-blue-2 font-medium font-poppins px-4"
                        >
                          ×
                        </a>
                      </div>
                      <div className="py-2 px-4 fcursor-pointer border border-gray-200 flex align-middle justify-center my-2 mx-3 rounded-md group">
                        <Link href={"/contact"}>
                          <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                            {t("Contact")}
                          </p>
                        </Link>
                      </div>
                      <div className="py-3 px-4 fcursor-pointer border-b border-gray-200 flex align-middle justify-between group">
                        <Link href={"/dashboard"}>
                          <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                            {t("Dashboard")}
                          </p>
                        </Link>
                      </div>
                      <div className="py-3 px-4 fcursor-pointer border-b border-gray-200 flex align-middle justify-between group">
                        <Link href={"/dashboard"}>
                          <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                            {t("New Team")}
                          </p>
                        </Link>
                        <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                          +
                        </p>
                      </div>
                      <div className="py-3 px-4 fcursor-pointer border-b border-gray-200 flex align-middle justify-between group">
                        <Link href={"/settings"}>
                          <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                            {t("Settings")}
                          </p>
                          </Link>
                      </div>
                      <div className="py-3 px-4 fcursor-pointer border-b border-gray-200 flex align-middle justify-between group">
                        <p
                          onClick={() => logoutUser()}
                          className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200"
                        >
                          {t("Logout")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="py-3 mt-10 px-4 fcursor-pointerflex align-middle justify-between group">
                        <Link href={"/dashboard"}>
                          <h3 className="self-center text-md text-gray-700 font-semibold group-hover:opacity-70 text-[1.3rem] transition duration-200">
                            {t("Resources")}
                          </h3>
                        </Link>
                      </div>
                      <div className="py-3 px-4 fcursor-pointer border-b border-gray-200 flex align-middle justify-between group">
                        <Link href={"/dashboard"}>
                          <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                            {t("Changelog")}
                          </p>
                        </Link>
                      </div>
                      <div className="py-3 px-4 fcursor-pointer border-b border-gray-200 flex align-middle justify-between group">
                        <Link href={"/support"}>
                          <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                            {t("Help")}
                          </p>
                        </Link>
                      </div>
                      <div className="py-3 px-4 fcursor-pointer border-b border-gray-200 flex align-middle justify-between group">
                        <Link href={"/dashboard"}>
                          <p className="self-center text-md text-dark-blue-2 group-hover:opacity-70 text-[1.1rem] transition duration-200">
                            {t("Documentation")}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
