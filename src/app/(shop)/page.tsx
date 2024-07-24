export const revalidate = 60; //60 segundos

import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products, totalPages, currentPage} = await getPaginatedProductWithImages({page});

  if (products.length === 0) {
    redirect('/');
  }
  
  return (
    <>
      <Title 
        title="Shop"
        subTitle="All products"
        className="mb-2"
      />

      <ProductGrid products={products}/>

      <Pagination totalPages={totalPages} />
      
    </>
  );
}
