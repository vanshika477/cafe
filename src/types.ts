/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  category: 'thali' | 'snacks' | 'sweets' | 'beverages';
  image: string;
  isVeg: boolean;
  isSpicy: 'low' | 'medium' | 'high';
  isPopular?: boolean;
  rating: number;
}

export interface CartItem {
  menuId: string;
  quantity: number;
  customization?: {
    gheeOption?: 'standard' | 'extra' | 'none';
    spicyLevel?: 'default' | 'mild' | 'spicy';
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  dishName?: string;
}

export interface CateringInquiry {
  name: string;
  phone: string;
  date: string;
  guests: number;
  eventType: string;
  message: string;
}
