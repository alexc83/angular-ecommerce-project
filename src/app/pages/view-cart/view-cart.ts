import { Component } from '@angular/core';
import {BackButton} from '../../components/back-button/back-button';
import {RouterLink} from '@angular/router';
import {ListCartItems} from './list-cart-items/list-cart-items';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButton,
    RouterLink,
    ListCartItems
  ],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {

}
