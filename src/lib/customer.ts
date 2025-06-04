import { Customer } from '@/utils/types'

export const customers: Customer[] = [
  {
    id: 1,
    name: 'Jessica Jackson',
    email: 'jessicajackson@gmail.com',
    phoneNumber: '+2348077106764',
    orders: 50,
    created: '24 Mar 2025',
    lastLogin: '24 Mar 2025',
    status: 'Suspended',
    avatar: 'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg'
  },
  {
    id: 2,
    name: 'Jessica Jackson',
    email: 'jessicajackson@gmail.com',
    phoneNumber: '+2348077106764',
    orders: 10,
    created: '2 Apr 2025',
    lastLogin: '2 Apr 2025',
    status: 'Active',
    avatar: 'https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg'
  },
  // Add more dummy data following the same structure
]

import { CustomerDetails } from '@/utils/types'

export const customerDetails: CustomerDetails = {
  id: 1,
  name: 'Jessica Jackson',
  email: 'jacksonjess@gmail.com',
  phone: '+2348077001981',
  address: 'No 23 Michael Cresent, Alimosho, Enugu State, Nigeria',
  dateCreated: 'May 1st 2025',
  lastLogin: 'May 6th 2025',
  status: 'Active',
  avatar: 'https://www.shutterstock.com/image-vector/black-woman-smiling-portrait-vector-600nw-2281497689.jpg',
  orders: [
    {
      id: '#302012',
      product: 'Chandelier',
      productCount: 3,
      date: '1 min ago',
      total: 'N150,000',
      status: 'Processing'
    },
    {
      id: '#302012',
      product: 'Chandelier',
      productCount: 3,
      date: '1 min ago',
      total: 'N150,000',
      status: 'Processing'
    },
    {
      id: '#302012',
      product: 'Chandelier',
      productCount: 3,
      date: '1 min ago',
      total: 'N150,000',
      status: 'Delivered'
    },
    {
      id: '#302012',
      product: 'Chandelier',
      productCount: 3,
      date: '1 min ago',
      total: 'N150,000',
      status: 'Placed'
    },
    {
      id: '#302012',
      product: 'Chandelier',
      productCount: 3,
      date: '1 min ago',
      total: 'N150,000',
      status: 'Cancelled'
    },
    {
      id: '#302011',
      product: 'Wall Light',
      productCount: 1,
      date: '1 min ago',
      total: 'N150,000',
      status: 'Processing'
    },
    {
      id: '#302002',
      product: 'POD/Surface Light',
      productCount: 1,
      date: '5 hour ago',
      total: 'N150,000',
      status: 'Delivered'
    },
    // Add more orders following the same pattern
  ]
}