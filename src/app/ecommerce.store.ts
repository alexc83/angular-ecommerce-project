import {Product} from './models/product';
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import products from "./data/products.json"
import {computed, inject} from '@angular/core';
import {produce} from 'immer';
import {Toaster} from './services/toaster';
import {CartItem} from './models/CartItem';

export type EcommerceState = {
  category: string;
  productsList: Product[];
  wishlistItems: Product[];
  shoppingCart: CartItem[];
}

const initialState: EcommerceState = {
  productsList: products,
  category: "all",
  wishlistItems: [],
  shoppingCart: []
}


export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },
  withState(initialState),
  withComputed(({category, productsList, wishlistItems, shoppingCart}) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return productsList();

      return productsList().filter(
        (p) => p.category.toLowerCase() === category().toLowerCase());
    }),

    wishlistCount: computed(() => wishlistItems().length),

    shoppingCartCount: computed(() =>
      shoppingCart().reduce((acc, item) => acc + item.quantity, 0)),
  })),

  withMethods((store, toaster = inject(Toaster)) => ({

    setCategory: signalMethod<string>((category: string) => {
      patchState(store, {category})
    }),

    addToWishlist: (product: Product) => {
      const updatedWishlist = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)) {
          draft.push(product);
        }
      })

      patchState(store, {wishlistItems: updatedWishlist});
      toaster.success(`${product.name} added to the wishlist`);
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {wishlistItems: store.wishlistItems().filter(p => p.id !== product.id)});
      toaster.success(`${product.name} removed from the wishlist`)
    },

    clearWishlist: () => {
      patchState(store, {wishlistItems: []});
    },

    addToCart: (product: Product, quantity = 1) => {

      const existingItemIndex = store.shoppingCart().findIndex(i => i.product.id === product.id);

      const updatedCart = produce(store.shoppingCart(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity++;
        } else {
          const newCartItem: CartItem = {product, quantity};
          draft.push(newCartItem);
        }
      })

      patchState(store, {shoppingCart: updatedCart});
      toaster.success(existingItemIndex !== -1 ?
        `${product.name} quantity increased in cart` :
        `${product.name} added to the cart`);
    },

    setItemQuantity: (params: { productId: string, quantity: number}) => {
      const index = store.shoppingCart().findIndex(i => i.product.id === params.productId);
      const updated = produce(store.shoppingCart(), draft => {
        draft[index].quantity = params.quantity;
      })

      patchState(store, {shoppingCart: updated});
    },



  }))
)
