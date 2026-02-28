import {Component, computed, inject, input, signal} from '@angular/core';
import {Product} from '../../models/product';
import products from "../../data/products.json"
import {ProductCard} from '../../components/product-card/product-card';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {TitleCasePipe, UpperCasePipe} from '@angular/common';
import {EcommerceStore} from '../../ecommerce.store';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {

  category = input<string>('all');
  categories = signal<string[]>(["all", "electronics", "fashion", "fitness", "furniture", "home"]);

  constructor() {
    this.store.setCategory(this.category);
  }

  store = inject(EcommerceStore);

}
