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

export interface Admin {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  lastLogin: string
  dateAdded: string
}

export const administrators: Admin[] = [
  {
    id: 1,
    name: 'Jessica Jackson',
    email: 'jessicajackson@gmail.com',
    role: 'Customer Service Manager',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=1',
    lastLogin: '24 Mar 2025',
    dateAdded: '24 Mar 2025'
  },
  // Add more dummy data...
]

export interface Role {
  id: number
  title: string
  department: string
  assignedUsers: number
  modules: {
    name: string
    permissions: {
      read: boolean
      fullAccess: boolean
      update: boolean
      add: boolean
      delete?: boolean
    }
  }[]
}

export const availableRoles = [
  'Order Manager',
  'Super Admin',
  'Product Manager', 
  'Inventory Manager',
  'Sales Manager',
  'CEO',
  'Customer Success Manager'
]

export const modulesList = [
  'Order Management',
  'Customer Management',
  'Discount & Promotion',
  'Products',
  'Shipping & Logistics',
  'Inventory',
  'Returns & Refunds',
  'Notifications',
  'Permission & Roles',
  'Banner Management',
  'Audit Logs',
  'Settings'
]

export const roles: Role[] = [
  {
    id: 1,
    title: 'Order Manager',
    department: 'Operations',
    assignedUsers: 3,
    modules: modulesList.map(name => ({
      name,
      permissions: {
        read: true,
        fullAccess: false,
        update: true,
        add: true,
        delete: false
      }
    }))
  },
  {
    id: 2,
    title: 'Super Admin',
    department: 'Management',
    assignedUsers: 1,
    modules: modulesList.map(name => ({
      name,
      permissions: {
        read: true,
        fullAccess: true,
        update: true,
        add: true,
        delete: true
      }
    }))
  },
  {
    id: 3,
    title: 'Product Manager',
    department: 'Product Development',
    assignedUsers: 1,
    modules: modulesList.map(name => ({
      name,
      permissions: {
        read: true,
        fullAccess: false,
        update: true,
        add: true,
        delete: false
      }
    }))
  },
  // ... continue with other roles
]