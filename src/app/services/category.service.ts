import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiGetCategories = `${environment.apiBaseUrl}/categories`;

    constructor(private http: HttpClient){}
    getCategories():Observable<any>{
        return this.http.get<any[]>(this.apiGetCategories);
    }
}