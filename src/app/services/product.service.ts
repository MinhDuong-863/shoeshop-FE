import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = `${environment.apiBaseUrl}/products`;

    constructor(private http: HttpClient) { }

    getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number): Observable<Product[]> {
        debugger
        const params = new HttpParams()
            .set('keyWord', keyword.toString())
            .set('category_id', selectedCategoryId)
            .set('page', (page-1).toString())
            .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiGetProducts, { params });
    }
    getDetailProduct(productId: number){
        return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
    }
    getProductByIds(productIds: number[]) : Observable<Product[]>{
        //chuyển danh sách id thành 1 chuỗi
        debugger
        const params = new HttpParams().set('ids', productIds.join(','));
        return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, { params });
    }
}