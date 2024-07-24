"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypaltransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "The token could not be generated",
    };
  }

  const resp = await verifyPayPalPayment(paypaltransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: " Error whilte verifying the payment",
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "This has not been payed yet",
    };
  }

  try {
    console.log({ status, purchase_units });

    //Update the DB
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    //Revalido
    revalidatePath(`/orders/${orderId}`);
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "500 - This payment was not successful",
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2URL, {
      ...requestOptions,
      cache: "no-store",
    }).then((resp) => resp.json());
    return result.access_token;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderURL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(paypalOrderURL, {
      ...requestOptions,
      cache: "no-store",
    }).then((resp) => resp.json());

    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
};
