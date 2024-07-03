import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor(private productService: ProductService){}

  ngOnInit() {
    this.getProducts(this.currentPage, this.itemsPerPage);
  }
  getProducts(pages: number, limit: number){
    this.productService.getProducts(pages, limit).subscribe({
      next: (response: any)=>{
        debugger
        response.products.forEach((product: Product)=>{
          debugger
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = response.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: ()=>{
        debugger;
      },
      error: (error: any)=>{
        debugger;
        console.error('Error fetching products', error);
      }
    });
  }
  onPageChange(page: number){
    debugger;
    this.currentPage = page;
    this.getProducts(this.currentPage, this.itemsPerPage);
  }
  generateVisiblePageArray(currentPage: number, totalPages: number){
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages/ 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if(endPage - startPage + 1 < maxVisiblePages){
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
}
