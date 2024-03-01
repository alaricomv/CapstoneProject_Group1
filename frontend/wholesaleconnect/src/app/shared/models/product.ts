export class Product{
    id!: number;
    product_key!: string;
    name!: string;
    description!: string;
    price_per_dozen!: number;
    price_box?:number;
    pieces_per_box?:number;
    total_pieces!: number;
    tags!: string;
    imageUrl?:string;
}