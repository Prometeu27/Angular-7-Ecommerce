import { Product } from './product';

export class CartProduct {
  $key: string;
  name: string;
  imageUrl: string;
  price: number; 
  quantity: number; 

  constructor(init?: Partial<CartProduct>) {
    Object.assign(this, init);
  }

  get totalPrice() { return this.price * this.quantity; }
}