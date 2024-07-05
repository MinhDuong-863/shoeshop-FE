import { ProductImage } from "./product.image";

export interface Product {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category_id: number;
    url: string
    formattedPrice: string;
    product_images: ProductImage[];
}