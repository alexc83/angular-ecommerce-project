import {Component, computed, inject, input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Product} from '../../models/product';
import {EcommerceStore} from '../../ecommerce.store';

@Component({
  selector: 'app-delete-from-wishlist-button',
    imports: [
        MatIcon,
        MatIconButton
    ],
  templateUrl: './delete-from-wishlist-button.html',
  styleUrl: './delete-from-wishlist-button.scss',
})
export class DeleteFromWishlistButton {

  product = input.required<Product>()

  store = inject(EcommerceStore);

  deleteFromWishlist(product: Product) {
    this.store.removeFromWishlist(product);
  }

}
