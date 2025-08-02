import { Star, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  onAddToCart: (id: string) => void;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  onAddToCart 
}: ProductCardProps) {
  const navigate = useNavigate();
  const isOnSale = originalPrice && originalPrice > price;

  return (
    <Card className="group bg-gradient-card border-border hover:shadow-card hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer touch-target">
      <div 
        className="relative aspect-square overflow-hidden bg-muted/20 rounded-t-lg"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-gradient-accent text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </div>
        )}
      </div>
      
      <CardContent className="p-3 sm:p-4">
        <h3 
          className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer"
          onClick={() => navigate(`/product/${id}`)}
        >
          {name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  i < Math.floor(rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-muted-foreground"
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">({reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">${price}</span>
            {isOnSale && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          
          <Button 
            variant="cart" 
            size="sm"
            onClick={() => onAddToCart(id)}
            className="group-hover:shadow-glow touch-target text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}