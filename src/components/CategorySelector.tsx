import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Footprints,
  Shirt,
  Layers,
  Scissors,
  Crown,
  Backpack,
  Wallet,
  Gamepad2,
  Home,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

const categories: Category[] = [
  // Footwear
  { id: "footwear", name: "FOOTWEAR", icon: Footprints },

  // Outerwear
  { id: "outerwear", name: "OUTERWEAR", icon: Layers },

  // Tops
  { id: "tops", name: "TOPS", icon: Shirt },

  // Bottoms
  { id: "bottoms", name: "BOTTOMS", icon: Scissors },

  // Accessories
  { id: "accessories", name: "ACCESSORIES", icon: Crown },

  // Bags & Travel
  { id: "bags-travel", name: "BAGS & TRAVEL", icon: Backpack },

  // Wallets & Cards
  { id: "wallets-cards", name: "WALLETS & CARDS", icon: Wallet },

  // Electronics
  { id: "electronics", name: "ELECTRONICS", icon: Gamepad2 },

  // Home & Decor
  { id: "home-decor", name: "HOME & DECOR", icon: Home },
];

export const CategorySelector = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId: string) => {
    console.log(`Shopify API: Navigating to category ${categoryId}`);
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Shop by Category</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          → Clothes Section
        </button>
      </div>

      {/* Mobile-first responsive grid - stacks categories on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group flex flex-col items-center p-3 sm:p-4 rounded-lg bg-card/50 border border-border hover:bg-card hover:border-primary/20 transition-all duration-200 active:scale-95 touch-target"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-primary/10 transition-colors">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-medium text-primary text-center leading-tight px-1">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
