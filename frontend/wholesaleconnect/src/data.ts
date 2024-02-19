import { Product } from "./app/shared/models/product";

export const sample_products: Product[] = [
    {id: 0,
        product_key: "SSH-23029",
        name: "Notebooks",
        description: "Notebooks different colors",
        price_per_dozen: 10,
        price_box: 8,
        pieces_per_box: 10,
        total_pieces: 20,
        tags: "School supplies, books",
        imageUrl: "/assets/products_images/ssh-23029.png"
    },
    {id: 1,
        product_key: "SSH-23V22",
        name: "Hair things",
        description: "Hair things multiple colors, ask for more info",
        price_per_dozen: 6,
        price_box: 8,
        pieces_per_box: 5,
        total_pieces: 20,
        tags: "School supplies, books",
        imageUrl: "/assets/products_images/ssh-23v22.png"
    }
]