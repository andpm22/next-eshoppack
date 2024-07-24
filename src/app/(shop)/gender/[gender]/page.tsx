export const revalidate = 60; //60 segundos
import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";



interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

export default async function GenderPage ({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products, totalPages, currentPage} = await getPaginatedProductWithImages({page, gender: gender as Gender});

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }


  //Los ids vienen de los parametros del topmenu, y aca convierto
  const labels: Record<string, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex',
  }

  return (
    <>
      <Title
        title={`${labels[gender]}'s articles `}
        subTitle="All products"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
