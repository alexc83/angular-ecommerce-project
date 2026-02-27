import {Component, computed, input, signal} from '@angular/core';
import {Product} from '../../models/product';
import products from "../../data/products.json"

@Component({
  selector: 'app-products-grid',
  imports: [],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {

  category = input<string>("all");

  products = signal<Product[]>(products);

  filteredProducts = computed(() =>
    this.products().filter(p => p.category === this.category().toLowerCase()));
  protected readonly parseInt = parseInt;
}
