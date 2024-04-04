import { Product } from "./product";

export class CartItem{
    constructor(public product:Product){
        this.product = product;
    }
    quantity: number = 0;
    price_dozen: number = this.product.price_per_dozen;
    quantity_box: number = 0;
}