import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../responses/order/order.response';
import { OrderService } from '../../services/order.service';
import { environment } from '../../environments/environment';
import { OrderDetail } from '../../models/order.detail';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order.detail.component.html',
  styleUrl: './order.detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail(): void {
    const orderId = 2;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        debugger;
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(response.order_date);
        this.orderResponse.shipping_date = new Date(response.shipping_date);
        this.orderResponse.status = response.status;
        this.orderResponse.order_details = response.order_details.map((order_detail: OrderDetail) => {
          order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
          return order_detail;
        });
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.total_money = response.total_money;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('vi-VN');
  }
}
