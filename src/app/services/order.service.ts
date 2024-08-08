import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { OrderDTO } from "../dtos/order/order.dto"; 
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrlOrder = `${environment.apiBaseUrl}/orders`;
    constructor(private http: HttpClient) { }
    placeOrder(orderData: OrderDTO): Observable<any> {
        return this.http.post(this.apiUrlOrder, orderData);
    }
    getOrderById(orderId: number): Observable<any> {
        return this.http.get(`${this.apiUrlOrder}/${orderId}`);
    }
    getOrdersByUserId(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrlOrder}/user/${userId}`);
    }
}
