import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResponse } from '../../responses/order/order.response';
import { TokenService } from '../../services/token.service';
import { environment } from '../../environments/environment';
import { OrderDetail } from '../../models/order.detail';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orderResponses: OrderResponse[] = [
    {
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
    },
    // Thêm các đối tượng OrderResponse khác nếu cần
  ];

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getOrdersByUserId();
  }

  getOrdersByUserId(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = this.tokenService.getUserId();
      this.orderService.getOrdersByUserId(userId).subscribe({
        next: (response: OrderResponse[]) => {
          this.orderResponses = response.map(orderResponse => ({
            id: orderResponse.id,
            user_id: orderResponse.user_id,
            fullname: orderResponse.fullname,
            email: orderResponse.email,
            phone_number: orderResponse.phone_number,
            address: orderResponse.address,
            note: orderResponse.note,
            status: orderResponse.status,
            total_money: orderResponse.total_money,
            shipping_method: orderResponse.shipping_method,
            shipping_address: orderResponse.shipping_address,
            payment_method: orderResponse.payment_method,
            order_details: orderResponse.order_details.map((order_detail: OrderDetail) => {
              order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
              return order_detail;
            }),
            order_date: new Date(orderResponse.order_date),
            shipping_date: new Date(orderResponse.shipping_date)
          }));
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        }
      });
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  viewOrderDetail(orderId: number): void {
    this.router.navigate(['/order-detail', orderId]);
  }
  
}
