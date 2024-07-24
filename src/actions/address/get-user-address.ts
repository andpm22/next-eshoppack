"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const getAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    if (!getAddress) return null;
    const { countryId, address2, ...rest } = getAddress;
    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : "",
    };
  } catch (error) {
    console.log(error);

    return null;
  }
};
