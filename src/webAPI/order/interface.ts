export interface OrderItem {
  product_id: string;
  product_image: string;
  product_name: string;
  product_feature: string;
  product_price: number;
  product_quantity: number;
}

export interface Order {
  createdAt: string;
  order_number: string;
  is_cancel: boolean;
  is_done: boolean;
  is_paid: boolean;
  is_sent: boolean;
  total: number;
  buyer_fullname: string;
  buyer_phone: string;
  buyer_address: string;
  postal_code: string;
}
