"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUiStore } from "../../../store";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
} from "react-icons/io5";
import clsx from "clsx";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";
import { AdminOptions } from "./AdminOptions";

export const Sidebar = () => {
  const sideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const onCloseLogOut = () => {
    const btnClose = document.getElementById('btnClose');
    btnClose?.addEventListener('click', closeMenu);
    logout();
    window.location.replace("/");
  }

  return (
    <div className="">
      {/* Black Background */}
      {sideMenuOpen && (
        <div className="fixed top-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {sideMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* SideMenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-auto",
          {
            "translate-x-full": !sideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* Input */}
        <div className="relative mt-14 ">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Menu */}

        {isLoggedIn && (
          <>
            <Link
              href="/profile"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Profile</span>
            </Link>
            <Link
              href="/orders"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>
            <Link
              href="/"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => onCloseLogOut()}
              id="btnClose"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Log out</span>
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <Link
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Log in</span>
          </Link>
        )}
        {/* Aqui muestro las opciones de admin */}
        {session?.user.role === "admin" && <AdminOptions />}
      </nav>
    </div>
  );
};
