export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'rice' | 'soup' | 'snack' | 'swallow';
  ingredients?: string[];
  isPopular?: boolean;
}

export interface CartItem extends Dish {
  quantity: number;
}
