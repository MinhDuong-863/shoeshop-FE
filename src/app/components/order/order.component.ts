import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDTO } from '../../dtos/order/order.dto'; 
import { Validator } from 'class-validator';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: { product: Product, quantity: number }[] = [];
  totalAmount: number = 0;
  shippingFee: number = 15000;
  shippingMethod: string = 'basic';
  paymentMethod: string = 'cod';
  voucher: number = 0;
  couponCode: string = '';
  totalMoney: number = 0;

  orderData: OrderDTO = {
    user_id: 0,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: this.totalMoney,
    payment_method: this.paymentMethod,
    shipping_method: this.shippingMethod,
    coupon_code: '',
    cart_items: []
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.orderForm = this.fb.group({
      fullname: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phone_number: ['',[Validators.required, Validators.pattern('^[0-9]{10,11}$'), Validators.minLength(10)]],
      address: ['',[Validators.required]],
      payment_method: [this.paymentMethod,[Validators.required]],
      shipping_method: [this.shippingMethod,[Validators.required]],
      coupon_code: ['']
    });
  }

  ngOnInit(): void {
    debugger
    // this.cartService.clearCart();
    this.orderData.user_id = this.tokenService.getUserId();
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    if (productIds.length === 0) {
      return;
    }
    // gọi service để lấy thông tin sản phẩm từ productIds
    this.productService.getProductByIds(productIds).subscribe({
      next: (products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });
  }
  placeOrder(){
    debugger;
    if(this.orderForm.valid){
      // Sử dụng toán tử spread (...) để sao chép giá trị từ form vào orderData
      this.orderData={...this.orderData,...this.orderForm.value};
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      this.orderData.total_money = this.intoMoney();
      // dữ liệu hợp lệ, gọi service để đặt hàng
      this.orderService.placeOrder(this.orderData).subscribe({
        next:(response)=>{
          debugger;
          alert('Đặt hàng thành công');
          this.cartService.clearCart();
          this.router.navigate(['/orders/', response.id]);
        }, complete:()=>{
          debugger;
          this.calculateTotal();
        },error:(error:any)=>{
          alert(`Đặt hàng thất bại. Lỗi ${error}`);
        },
      });
    }else{
      alert('Dữ liệu không hợp lệ');
    }
  }
  calculateTotal(): number{
    return this.totalAmount=this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
  onShippingMethodChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement.value === 'basic') {
      this.shippingFee = 15000;
      this.shippingMethod = 'basic';
    } else {
      this.shippingFee = 30000;
      this.shippingMethod = 'express';
    }
  }
  onPaymentMethodChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement.value === 'cod') {
      this.paymentMethod = 'cod';
    } else {
      this.paymentMethod = 'creditcard';
    }
  }
  intoMoney(): number {
    return this.totalAmount + this.shippingFee - this.voucher;
  }
}
