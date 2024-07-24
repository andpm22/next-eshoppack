"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInfo()
  );

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    //Server action
    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));

    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      console.log({ resp });

      return;
    }
    //Todo sale bien
    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Delivery address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.phone}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2">Order&apos;s summary</h2>
      <div className="grid grid-cols-2">
        <span>No. productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
        </span>
        <span>Sub total</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Taxes(13%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <span className="text-xs">
          You are acepting our terms and conditions when clicking the button.
        </span>
        <p className="text-red-500 font-bold">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          className={clsx("justify-center mt-4", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Set your purchase
        </button>
      </div>
    </div>
  );
};
