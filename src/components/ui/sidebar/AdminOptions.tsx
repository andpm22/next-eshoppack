import { useUiStore } from "@/store";
import Link from "next/link";
import { IoPeopleOutline, IoShareOutline, IoTicketOutline } from "react-icons/io5";

export const AdminOptions = () => {


  const closeMenu = useUiStore((state) => state.closeSideMenu);

  return (
    <>
      {/* Line separator */}
      <div className="w-full h-px bg-gray-200 my-10" />
      <span className="font-semibold">Admin options</span>
      <Link
        href="/admin/products"
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        onClick={() => closeMenu()}
      >
        <IoShareOutline size={30} />
        <span className="ml-3 text-xl">Products</span>
      </Link>
      <Link
        href="/admin/orders"
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        onClick={() => closeMenu()}
      >
        <IoTicketOutline size={30} />
        <span className="ml-3 text-xl">Orders</span>
      </Link>
      <Link
        href="/admin/users"
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        onClick={() => closeMenu()}
      >
        <IoPeopleOutline size={30} />
        <span className="ml-3 text-xl">Users</span>
      </Link>
    </>
  );
};
