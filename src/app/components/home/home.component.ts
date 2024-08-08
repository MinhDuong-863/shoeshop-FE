import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  productResponses: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];

  categories: Category[] = [];
  cateBegin: number = 0;

  selectedCategoryId: number = 0;
  keyword: string = '';
  searchInput: string = '';

  slideIndex: number = 1;
  slideInterval: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.getCategories();
  }

  ngAfterViewInit() {
    this.showSlides(this.slideIndex);
    this.slideInterval = setInterval(() => this.plusSlides(1), 3000); // Change slide every 3 seconds
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error getting categories:', error);
      }
    });
  }

  searchProduct() {
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.keyword = this.keyword.trim();
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        response.productResponses.forEach((product: Product) => {
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          product.formattedPrice = this.formatCurrency(product.price);
        });
        this.productResponses = response.productResponses;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      error: (error: any) => {
        console.error('Error fetching products', error);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  onProductClick(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  // Slideshow methods
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    let i;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;

    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activedot", "");
    }
    if (slides[this.slideIndex - 1]) {
      slides[this.slideIndex - 1].style.display = "block";
      slides[this.slideIndex - 1].classList.add("active");
      dots[this.slideIndex - 1].className += " activedot";
    }
  }
}
