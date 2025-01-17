"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const deleteAddress = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "This could not be removed",
    };
  }
};
