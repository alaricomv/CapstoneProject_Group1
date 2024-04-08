export interface IProductRegister{
    storefront_id: number;
    product_key: string;
    name:string;
    description: string;
    tags: string;
    price_per_dozen: number;
    price_box:number;
    total_pieces:number;
    pieces_per_box: string;
    total_boxes: number;
    imageUrl: string | undefined;
}