import {Product} from './models/product';
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import products from "./data/products.json"
import {computed} from '@angular/core';

export type EcommerceState = {
  category: string;
  productsList: Product[];
}

const initialState: EcommerceState = {
  productsList: products,
  category: "all",
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },
  withState(initialState),
  withComputed((
    {category, productsList}) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return productsList();

      return productsList().filter(
        (p) => p.category.toLowerCase() === category().toLowerCase());
    })
  })),
  withMethods((store) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, {category})
    })
  }))
)
