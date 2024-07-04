import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductImage } from '../../models/product.image';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;

  constructor(
    private productService: ProductService,

  ) { }
  ngOnInit() {
    // Lấy productId từ URL      
    // const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    debugger
    //this.cartService.clearCart();
    const idParam = 5 //fake tạm 1 giá trị
    if (idParam !== null) {
      this.productId = +idParam;
    }
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {            
          // Lấy danh sách ảnh sản phẩm và thay đổi URL
          debugger
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image:ProductImage) => {
              product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
            });
          }              
          debugger
          this.product = response 
          // Bắt đầu với ảnh đầu tiên
          this.showImage(0);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching detail:', error);
        }
      });    
    } else {
      console.error('Invalid productId:', idParam);
    }      
  }
  showImage(index: number): void {
    if (this.product?.product_images?.length) {
      // Sử dụng Math.max và Math.min để đảm bảo index nằm trong khoảng hợp lệ
      this.currentImageIndex = Math.max(0, Math.min(index, this.product.product_images.length - 1));
    }
  }
  thumbnailClick(index: number) {
    debugger
    this.currentImageIndex = index;
  }
  nextImage() {
    debugger
    this.showImage(this.currentImageIndex + 1);
  }
  previousImage() {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }
}
