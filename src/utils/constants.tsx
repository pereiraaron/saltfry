import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import { Link } from '@types';

export const links: Link[] = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'To create high-quality, thoughtfully designed furniture that enhances everyday living while remaining accessible and sustainable.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'To become a trusted destination for modern interior furniture—where craftsmanship, comfort, and design come together seamlessly.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: 'Founded with a passion for design and quality, Woodwork began as a small idea to make better furniture. Today, we continue that journey by blending traditional craftsmanship with contemporary aesthetics.',
  },
];
