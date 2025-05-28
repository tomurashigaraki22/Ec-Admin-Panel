type TimelineItem = {
    date: string;
    value: number;
  };
  
type YearlyTimelineItem = {
month: string;
value: number;
};

type MonthlyCustomerStats = {
    active_users: number;
    new_signups: number;
    month: string;
  };
  
type CustomerStatistics = {
[year: string]: MonthlyCustomerStats[];
};

type SalesTimeline = {
    daily: {
      data: TimelineItem[];
      total_sales: number;
    };
    monthly: {
      data: TimelineItem[];
      total_sales: number;
    };
    yearly: {
      data: YearlyTimelineItem[];
      total_sales: number;
    };
    summary: {
      last_12_months: number;
      last_24_hours: number;
      last_30_days: number;
      last_7_days: number;
    };
  };

export interface DashboardData {
    category_breakdown: {
        [key: string]: number;
    };
    customer_statistics: CustomerStatistics
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
    sales_timeline: SalesTimeline;
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