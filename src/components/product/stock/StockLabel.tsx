"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug);
      setStock(stock);
      setIsLoading(false);
    };
    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h2
          className={`${titleFont.className} antialiased font-bold text-md bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h2>
      ) : (
        <h2 className={`${titleFont.className} antialiased font-bold text-md`}>
          Stock: {stock}
        </h2>
      )}
    </>
  );
};
