import {Component, inject} from '@angular/core';
import {BackButton} from '../../components/back-button/back-button';
import {EcommerceStore} from '../../ecommerce.store';
import {ProductCard} from '../../components/product-card/product-card';
import {DeleteFromWishlistButton} from '../../components/delete-from-wishlist-button/delete-from-wishlist-button';
import {ToggleWishlistButton} from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import {MatButton} from '@angular/material/button';
import {EmptyWishlist} from './empty-wishlist/empty-wishlist';

@Component({
  selector: 'app-my-wishlist',
  imports: [
    BackButton,
    ProductCard,
    DeleteFromWishlistButton,
    ToggleWishlistButton,
    MatButton,
    EmptyWishlist
  ],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export default class MyWishlist {
    store = inject(EcommerceStore);
}
