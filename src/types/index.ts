export interface ProductObj {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number | null;
  thumbnail: string;
  images?: string[];
}
export type CartObj = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
export type CartItem = ProductObj & {
    quantity: number;
};

export type UserDetails = {
    email: string;
    password: string;
}