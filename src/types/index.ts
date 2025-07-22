export interface ProductObj {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
export type CartItem = ProductObj & {
    quantity: number;
};

export type UserDetails = {
    email: string;
    password: string;
}