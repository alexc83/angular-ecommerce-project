import { Component } from '@angular/core';
import {BackButton} from '../../components/back-button/back-button';
import {RouterLink} from '@angular/router';
import {ListCartItems} from './list-cart-items/list-cart-items';
import {TeaseWishlist} from './tease-wishlist/tease-wishlist';
import {SummarizeOrder} from '../../components/summarize-order/summarize-order';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButton,
    RouterLink,
    ListCartItems,
    TeaseWishlist,
    SummarizeOrder
  ],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {

}
