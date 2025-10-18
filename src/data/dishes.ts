import { Dish } from '@/types/dish';
import jollofRice from '@/assets/jollof-rice.jpg';
import ofadaRice from '@/assets/ofada-rice.jpg';
import egusiSoup from '@/assets/egusi-soup.jpg';
import efoRiro from '@/assets/efo-riro.jpg';
import suya from '@/assets/suya.jpg';
import moiMoi from '@/assets/moi-moi.jpg';
import akara from '@/assets/akara.jpg';
import poundedYam from '@/assets/pounded-yam.jpg';

export const dishes: Dish[] = [
  {
    id: '1',
    name: 'Jollof Rice',
    description: 'The iconic West African rice dish cooked in a rich tomato sauce with aromatic spices',
    price: 2500,
    image: jollofRice,
    category: 'rice',
    ingredients: ['Rice', 'Tomatoes', 'Onions', 'Peppers', 'Spices', 'Chicken/Beef (optional)'],
    isPopular: true,
  },
  {
    id: '2',
    name: 'Ofada Rice & Ayamase',
    description: 'Local unpolished rice served with spicy green pepper sauce',
    price: 3000,
    image: ofadaRice,
    category: 'rice',
    ingredients: ['Ofada Rice', 'Green Peppers', 'Palm Oil', 'Locust Beans', 'Assorted Meat'],
    isPopular: true,
  },
  {
    id: '3',
    name: 'Egusi Soup',
    description: 'Traditional melon seed soup with assorted meat and fish',
    price: 3500,
    image: egusiSoup,
    category: 'soup',
    ingredients: ['Melon Seeds', 'Palm Oil', 'Meat', 'Fish', 'Vegetables', 'Spices'],
    isPopular: true,
  },
  {
    id: '4',
    name: 'Efo Riro',
    description: 'Rich spinach stew cooked in palm oil with assorted meat',
    price: 3200,
    image: efoRiro,
    category: 'soup',
    ingredients: ['Spinach', 'Palm Oil', 'Assorted Meat', 'Crayfish', 'Peppers', 'Locust Beans'],
  },
  {
    id: '5',
    name: 'Suya',
    description: 'Spicy grilled meat skewers seasoned with our special suya spice',
    price: 1500,
    image: suya,
    category: 'snack',
    ingredients: ['Beef/Chicken', 'Suya Spice', 'Onions', 'Peppers'],
    isPopular: true,
  },
  {
    id: '6',
    name: 'Moi Moi',
    description: 'Steamed bean pudding with a smooth, savory taste',
    price: 800,
    image: moiMoi,
    category: 'snack',
    ingredients: ['Beans', 'Peppers', 'Onions', 'Palm Oil', 'Eggs (optional)'],
  },
  {
    id: '7',
    name: 'Akara',
    description: 'Crispy bean fritters, perfect as a snack or side dish',
    price: 500,
    image: akara,
    category: 'snack',
    ingredients: ['Beans', 'Onions', 'Peppers', 'Salt'],
  },
  {
    id: '8',
    name: 'Pounded Yam with Egusi',
    description: 'Smooth pounded yam served with rich egusi soup',
    price: 4000,
    image: poundedYam,
    category: 'swallow',
    ingredients: ['Yam', 'Egusi Soup'],
  },
];
