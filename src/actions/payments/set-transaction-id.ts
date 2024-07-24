"use server";
import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `Order: ${orderId} Could not be found`,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Transaction could not be stored",
    };
  }
};
