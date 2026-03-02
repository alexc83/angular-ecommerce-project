import {Component, computed, inject, input} from '@angular/core';
import {CartItem} from '../../models/CartItem';
import {QtySelector} from '../../components/qty-selector/qty-selector';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {EcommerceStore} from '../../ecommerce.store';

@Component({
  selector: 'app-show-cart-item',
  imports: [
    QtySelector,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {

  store = inject(EcommerceStore);
  item = input.required<CartItem>();
  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
