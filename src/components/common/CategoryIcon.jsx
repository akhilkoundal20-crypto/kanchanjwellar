import React from 'react';
import {
  Smartphone,
  Car,
  Home,
  Armchair,
  ShoppingBag,
  Wrench,
  Navigation,
  Briefcase,
  Utensils,
  Tag,
  Calendar,
  Package,
  Sparkles
} from 'lucide-react';

export default function CategoryIcon({ name, className = 'w-6 h-6' }) {
  switch (name) {
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Armchair':
      return <Armchair className={className} />;
    case 'ShoppingBag':
      return <ShoppingBag className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Navigation':
      return <Navigation className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Tag':
      return <Tag className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'Package':
      return <Package className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}
