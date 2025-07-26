export interface ProductObj {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number | null;
  images?: string[];
}
export type CartItem = ProductObj & {
    quantity: number;
};

export type UserDetails = {
    email: string;
    password: string;
}