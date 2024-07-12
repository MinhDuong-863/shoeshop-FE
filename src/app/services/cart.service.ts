import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
@Injectable({
    providedIn: "root"
})
export class CartService {
    private cart: Map<number, any> = new Map(); // Dung Map để lưu trữ sản phẩm trong giỏ hàng

    constructor(private productService:ProductService) {
        // Lấy dữ liệu giỏ hàng từ localStorage
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            this.cart = new Map(JSON.parse(cartData));
        }
     }
    getCart(): Map<number, any> {
        return this.cart;
        
    }
    addToCart(productId: number, quantity: number = 1): void {
        debugger
        if(this.cart.has(productId)){
            // Nếu sản phẩm đã có trong giỏ hàng thì cộng thêm số lượng
            this.cart.set(productId, this.cart.get(productId) + quantity);
        }else{
            // Nếu sản phẩm chưa có trong giỏ hàng thì thêm mới
            this.cart.set(productId, quantity);
        }
        // Lưu dữ liệu giỏ hàng vào localStorage
        this.saveCartToLocalStorage();
    }
    deleteFromCart(productId: number): void {
        this.cart.delete(productId);
        this.saveCartToLocalStorage();
    }
    saveCartToLocalStorage(): void {
        debugger
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
    clearCart(): void {
        debugger
        this.cart.clear();
        this.saveCartToLocalStorage();
    }
}