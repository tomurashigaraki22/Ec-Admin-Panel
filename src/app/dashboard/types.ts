export interface DashboardData {
    category_breakdown: {
        [key: string]: number;
    };
    customer_statistics: {
        active_users: number;
        new_signups: number;
    };
    order_status: {
        [key: string]: number;
    };
    overview: {
        inventory_level: string;
        total_customers: number;
        total_orders: number;
        total_sales: number;
    };
    order_volume_breakdown: {
        name: string;
        value: number;
    }[];
    sales_timeline: {
        last_12m: number;
        last_24h: number;
        last_30d: number;
        last_7d: number;
    };
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded' | 'Partially Paid';

export type Customer = {
  name: string;
  email: string;
};

type OrderStatus = 'Processing' | 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled'


export interface OrderTypes {
  id: string;
  product: {
    name: string
    additional_count?: number
}
  date: string;
  customer: {
    name: string
    email: string
}
  total: number;
  payment_status: 'paid' | 'unpaid' | 'Failed'; // Add this line
  status: OrderStatus;
}