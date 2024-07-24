"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUiStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

export const TopMenu = () => {
  const sideMenuOpen = useUiStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Eshoppack
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center menu */}

      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 transition-all hover:bg-gray-300"
          href="/gender/men"
        >
          Men
        </Link>
        <Link
          className="m-2 p-2 transition-all hover:bg-gray-300"
          href="/gender/women"
        >
          Women
        </Link>
        <Link
          className="m-2 p-2 transition-all hover:bg-gray-300"
          href="/gender/kid"
        >
          Kids
        </Link>
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href={(totalItemsInCart === 0 && isLoaded) ? "empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {isLoaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}

            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => sideMenuOpen()}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
