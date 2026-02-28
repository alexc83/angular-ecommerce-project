import {Product} from './models/product';
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import products from "./data/products.json"
import {computed, inject} from '@angular/core';
import {produce} from 'immer';
import {Toaster} from './services/toaster';

export type EcommerceState = {
  category: string;
  productsList: Product[];
  wishlistItems: Product[];
}

const initialState: EcommerceState = {
  productsList: products,
  category: "all",
  wishlistItems: [],
}


export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },
  withState(initialState),
  withComputed(({category, productsList, wishlistItems}) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return productsList();

      return productsList().filter(
        (p) => p.category.toLowerCase() === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length)
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

  }))
)
