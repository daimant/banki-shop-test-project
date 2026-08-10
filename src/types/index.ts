export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice: number | null;
  description: string;
  images: string[];
  soldOut: boolean;
}

export type ButtonState = 'default' | 'processing' | 'in-cart';
