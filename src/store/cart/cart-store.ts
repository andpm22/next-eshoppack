import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  getSummaryInfo: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (product: CartProduct) => void;

  updateProductQuantity: (product: CartProduct, quantity: number) => void;

  removeProduct: (product: CartProduct) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInfo: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );

        const tax = subTotal * 0.13;
        const total = subTotal + tax;

        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
      addProductTocart: (product: CartProduct) => {
        const { cart } = get();
        //1. Reviso si el producto ya existe en el carrito
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //2. El producto existe por talla... se tiene que incrementar
        const udpatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: udpatedCartProducts });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const removingItemsWithFilter = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: removingItemsWithFilter });
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
