import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiGetCategories = `${environment.apiBaseUrl}/categories`;

    constructor(private http: HttpClient){}
    getCategories():Observable<Category[]>{
        return this.http.get<Category[]>(this.apiGetCategories);
    }
    getCategoryById(categoryId: number){
        return this.http.get(`${environment.apiBaseUrl}/categories/${categoryId}`);
    }
}