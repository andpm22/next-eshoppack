"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {itemsInCart, subTotal, tax, total} = useCartStore(state => state.getSummaryInfo());

    useEffect(() => {
        setIsLoaded(true);
      
    }, [])
    if (!isLoaded) return <p>Loading...</p>
    
  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. productos</span>
        <span className="text-right">{itemsInCart === 1 ? '1 item' : `${itemsInCart} items`}</span>
        <span>Sub total</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Taxes(13%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>
    </>
  );
};
