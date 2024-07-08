import { Product } from "../../models/product";

export class CartItemDTO {
    product_id: Product;
    quantity: number;
    constructor(data:any){
        this.product_id = data.product_id;
        this.quantity = data.quantity;
    }
}