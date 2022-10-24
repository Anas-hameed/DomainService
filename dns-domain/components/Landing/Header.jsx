/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext,useCallback } from "react";
import Link from "next/dist/client/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { siteSettings } from "../../config/site-setting";
import {
  faBars,
  faEnvelope,
  faHeadset,
  faKey,
  faPhone,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../utils/auth-context";
import useTranslation from "next-translate/useTranslation";
import AuthBtn from "./AuthBtn";
import { useKeycloak } from "@react-keycloak/ssr";
import { isAuthenticated } from "../../utils/auth";
import { removeToken } from "../../utils/auth";
import Image from "next/image";
import { setToken } from "../../utils/auth";

export default function Header() {
  const { t, lang } = useTranslation("common");
  const { keycloak } = useKeycloak();

  const router = useRouter();
  // const [showHead, setShowHead] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showMobilePages, setShowMobilePages] = useState(false);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1023) {
        setToggle(false);
      }
    });
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  });

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true);
    }
  }, []);

  const refreshToken = useCallback(()=> {
    var token=keycloak?.token;
    setToken(token)
    if(!token){
      setIsLoggedIn(false);
      removeToken()
    }else{
      setIsLoggedIn(true);
    }
  },[keycloak,setToken,setIsLoggedIn,removeToken])

  useEffect(() => {
    setInterval(() => {
      refreshToken()
    }, 3000);
  }, []);

  
  
  function loginUser() {
    if (keycloak) {
      window.location.href = keycloak.createLoginUrl({
        redirectUri:
          window.location.origin +
          "/" +
          lang +
          "/dashboard/redirect?url=" +
          (router.query.url ? router.query.url : ""),
        locale: lang ? lang : "en",
      });
    }
  }
  function logoutUser() {
    if (typeof window !== "undefined") {
      if (keycloak) {
        removeToken();
        setUser({});
        window.location.href = keycloak.createLogoutUrl({
          redirectUri: window.location.origin + "/" + lang,
        });
      }
    }
  }

  return (
    <div>
      {/* Navbar */}
      <div
        className={`w-full fixed  z-10 border-gray-300 ${scroll || router.pathname !== "/"
          ? "bg-dark-blue shadow"
          : `"bg-transparent"}`
          }`}
      >
        <div className="container mx-auto w-full">
          <div className="flex items-center justify-between align-middle w-full ">
            <Link href="/">
              <Image
                width={100}
                height={60}
                className="w-[100px] py-3"
                src="/images/logo.png"
                alt="Logo"
              />
            </Link>
            <div className="flex flex-1 align-middle justify-center">
              {toggle === false ? (
                <button
                  className="navToggleBtn"
                  onClick={() => setToggle(true)}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              ) : null}
              <ul className="navMenu">
                <li className="nav-item p-2 mx-5">
                  <Link href="/">
                    <a
                      className={`nav-link text-white p-0 text-base ${router.pathname === "/"
                        ? "font-bold underline underline-offset-8 text-lg"
                        : null
                        }`}
                    >
                      Home
                    </a>
                  </Link>
                </li>
                <li className="group nav-item px-2 mx-5">
                  <div className="inline-block text-left py-2">
                    <div>
                      <button
                        type="button"
                        // hover:text-lg
                        className="inline-flex justify-center w-full shadow-base px-4 py-5 bg-transparent text-base font-medium text-white focus:outline-none"
                        id="menu-button"
                      >
                        {t("Products")}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5 my-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Dropdown for Pages */}
                    <div
                      className="hidden mt-2 group-hover:block origin-bottom-right absolute right-[15%] w-[50%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      id="menu-dropdown"
                    >
                      <div className="flex flex-col align-middle w-full py-5 px-10">
                        {siteSettings?.headerMenuItems.map((parent, j) => {
                          return (
                            <div
                              key={j}
                              className="flex flex-row align-middle justify-between gap-5"
                            >
                              {parent.map((item, i) => {
                                return (
                                  <Link href={item.href} key={i}>
                                    <p className="flex align-middle gap-2 text-black text-base font-normal h-14 w-full max-w-[160px] border-b-[0.5px] border-black-100">
                                      <FontAwesomeIcon
                                        className="my-auto"
                                        color="black"
                                        icon={item.icon}
                                      />
                                      <span className="my-auto">
                                        {item.label}
                                      </span>
                                    </p>
                                  </Link>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item p-2 mx-5">
                  <Link href="/marketplace">
                    <a
                      className={`nav-link text-white p-0 text-base ${
                        router.pathname === "/marketplace"
                          ? "font-bold underline underline-offset-8 text-lg"
                          : null
                      }`}
                    >
                      {t("Marketplace")}
                    </a>
                  </Link>
                </li>
                <li className="nav-item p-2 mx-5">
                  <Link href="/about-us">
                    <a
                      className={`nav-link text-white p-0 text-base ${router.pathname === "/about-us"
                        ? "font-bold underline underline-offset-8 text-lg"
                        : null
                        }`}
                    >
                      {t("Pricing")}
                    </a>
                  </Link>
                </li>
                {/* company */}

                <li className="group nav-item px-2 mx-5">
                  <div className="inline-block text-left py-2">
                    <div>
                      <button
                        type="button"
                        // hover:text-lg
                        className="inline-flex justify-center w-full shadow-base px-4 py-5 bg-transparent text-base font-medium text-white focus:outline-none"
                        id="menu-button"
                      >
                        {t("Company")}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5 my-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Dropdown for company */}
                    <div
                      className="hidden mt-2 group-hover:block origin-bottom-right absolute right-[15%] w-[50%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      id="menu-dropdown"
                    >
                      <div className="flex flex-col align-middle w-full py-5 px-10">
                        {siteSettings?.companyMenuItems.map((parent, j) => {
                          return (
                            <div
                              key={j}
                              className="flex flex-row align-middle justify-between gap-5"
                            >
                              {parent.map((item, i) => {
                                return (
                                  <Link href={item.href} key={i}>
                                    <p className="flex align-middle gap-2 text-black text-base font-normal h-14 w-full max-w-[160px] border-b-[0.5px] border-black-100">
                                      <FontAwesomeIcon
                                        className="my-auto"
                                        color="black"
                                        icon={item.icon}
                                      />
                                      <span className="my-auto">
                                        {item.label}
                                      </span>
                                    </p>
                                  </Link>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item p-2 mx-5">
                  <Link href="/contact">
                    <a
                      className={`nav-link text-white p-0 text-base ${router.pathname === "/contact"
                        ? "font-bold underline underline-offset-8 text-lg"
                        : null
                        }`}
                    >
                      {t("Contact")}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:mr-14">
              <AuthBtn authenticated={loggedIn} setUser={() => setUser({})} />
            </div>
          </div>
        </div>
        {toggle ? (
          <div className="navModal">
            <button onClick={() => setToggle(false)}>
              <FontAwesomeIcon
                className="text-white w-[20px] top-5 right-5 absolute"
                icon={faXmark}
              />
            </button>
            <ul className="navModalMenu">
              <li className="nav-item p-2 mx-5">
                <Link href="/">
                  <a
                    onClick={() => setToggle(false)}
                    className={`nav-link text-white p-0 text-base ${router.pathname === "/"
                      ? "font-bold underline underline-offset-8 text-lg"
                      : null
                      }`}
                  >
                    {t("Home")}
                  </a>
                </Link>
              </li>
              <li
                className="nav-item p-2 mx-5 w-[90%]"
                onClick={() => setShowMobilePages(!showMobilePages)}
              >
                <div className="inline-block text-left w-full">
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full shadow-base bg-transparent text-sm font-medium text-white focus:outline-none"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      {t("Products")}
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Dropdown for Pages */}
                  {showMobilePages ? (
                    <div
                      className="mt-2 origin-bottom-right w-full rounded-md shadow-lg bg-white ring-1 focus:outline-none"
                      id="menu-dropdown"
                    >
                      <div className="flex flex-col align-middle w-full p-5">
                        <div className="flex flex-col align-middle justify-between">
                          {siteSettings?.headerMenuItems.map((parent, j) => {
                            return (
                              <div key={j}>
                                {parent.map((item, i) => {
                                  return (
                                    <Link href={item.href} key={i}>
                                      <p className="flex align-middle gap-2 text-black text-base font-normal h-14 w-full border-b-[0.5px] border-black-100">
                                        <FontAwesomeIcon
                                          className="my-auto"
                                          color="black"
                                          icon={item.icon}
                                        />
                                        <span className="my-auto">
                                          {t(item.label)}
                                        </span>
                                      </p>
                                    </Link>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </li>
              <li className="nav-item p-2 mx-5">
                <Link href="/marketplace">
                  <a
                    onClick={() => setToggle(false)}
                    className={`nav-link text-white p-0 text-base ${router.pathname === "/marketplace"
                      ? "font-bold underline underline-offset-8 text-lg"
                      : null
                      }`}
                  >
                    {t("Marketplace")}
                  </a>
                </Link>
              </li>
              <li className="nav-item p-2 mx-5">
                <Link href="/about-us">
                  <a
                    onClick={() => setToggle(false)}
                    className={`nav-link text-white p-0 text-base ${router.pathname === "/about-us"
                      ? "font-bold underline underline-offset-8 text-lg"
                      : null
                      }`}
                  >
                    {t("Pricing")}
                  </a>
                </Link>
              </li>
              <li className="nav-item p-2 mx-5">
                <Link href="/contact">
                  <a
                    onClick={() => setToggle(false)}
                    className={`nav-link text-white p-0 text-base ${router.pathname === "/contact"
                      ? "font-bold underline underline-offset-8 text-lg"
                      : null
                      }`}
                  >
                    {t("Contact")}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
