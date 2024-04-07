export class Order{
    id!: number;
    user_id!: number;
    product_id!: number;
    storefront_id!: number;
    status!: string;
    date!:string;
    quantity_dozen!:number;
    price!: number;
    quantity_box!: number;
    address!: string;
}