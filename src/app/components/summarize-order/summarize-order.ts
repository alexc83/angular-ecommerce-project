import {Component, computed, inject} from '@angular/core';
import {ViewPanel} from '../../directives/view-panel';
import {EcommerceStore} from '../../ecommerce.store';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-summarize-order',
  imports: [
    ViewPanel,
    CurrencyPipe
  ],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {

  store = inject(EcommerceStore);

  subtotal = computed(() =>
    this.store.shoppingCart()
      .reduce((acc, item) =>
        acc + item.product.price * item.quantity, 0));

  tax = computed(() => this.subtotal() * 0.0825);

  total = computed(() => this.subtotal() + this.tax());

}
