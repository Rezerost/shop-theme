import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Sidebar } from "@/components/Sidebar";

// Import product images
import monocleBag from "@/assets/monocle-bag.jpg";
import squareOneBag from "@/assets/square-one-bag.jpg";
import sportyRichBag from "@/assets/sporty-rich-bag.jpg";

interface CategoryProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

// Placeholder products for categories
const categoryProducts: Record<string, CategoryProduct[]> = {
  footwear: [
    { id: "f1", name: "Premium Sneakers", price: 159.99, rating: 4.8, reviews: 89, image: monocleBag },
    { id: "f2", name: "Leather Boots", price: 249.99, rating: 4.9, reviews: 134, image: squareOneBag },
  ],
  outerwear: [
    { id: "o1", name: "Winter Jacket", price: 299.99, rating: 4.7, reviews: 76, image: sportyRichBag },
    { id: "o2", name: "Rain Coat", price: 129.99, rating: 4.6, reviews: 45, image: monocleBag },
  ],
  tops: [
    { id: "t1", name: "Cotton T-Shirt", price: 39.99, rating: 4.5, reviews: 203, image: squareOneBag },
    { id: "t2", name: "Polo Shirt", price: 69.99, rating: 4.7, reviews: 112, image: sportyRichBag },
  ],
  bottoms: [
    { id: "b1", name: "Denim Jeans", price: 89.99, rating: 4.6, reviews: 167, image: monocleBag },
    { id: "b2", name: "Chino Pants", price: 79.99, rating: 4.8, reviews: 98, image: squareOneBag },
  ],
  accessories: [
    { id: "a1", name: "Leather Watch", price: 199.99, rating: 4.9, reviews: 234, image: sportyRichBag },
    { id: "a2", name: "Sunglasses", price: 149.99, rating: 4.7, reviews: 156, image: monocleBag },
  ],
  "bags-travel": [
    { id: "bt1", name: "Monocle Canvas Tote Bag", price: 213.99, rating: 4.9, reviews: 128, image: monocleBag },
    { id: "bt2", name: "Travel Backpack", price: 179.99, rating: 4.8, reviews: 89, image: squareOneBag },
  ],
  "wallets-cards": [
    { id: "w1", name: "Leather Wallet", price: 79.99, rating: 4.6, reviews: 145, image: sportyRichBag },
    { id: "w2", name: "Card Holder", price: 49.99, rating: 4.5, reviews: 87, image: monocleBag },
  ],
  electronics: [
    { id: "e1", name: "Wireless Headphones", price: 249.99, rating: 4.8, reviews: 312, image: squareOneBag },
    { id: "e2", name: "Phone Case", price: 29.99, rating: 4.4, reviews: 198, image: sportyRichBag },
  ],
  "home-decor": [
    { id: "h1", name: "Minimalist Lamp", price: 129.99, rating: 4.7, reviews: 76, image: monocleBag },
    { id: "h2", name: "Wall Art", price: 89.99, rating: 4.6, reviews: 54, image: squareOneBag },
  ],
};

const categoryNames: Record<string, string> = {
  footwear: "Footwear",
  outerwear: "Outerwear", 
  tops: "Tops",
  bottoms: "Bottoms",
  accessories: "Accessories",
  "bags-travel": "Bags & Travel",
  "wallets-cards": "Wallets & Cards",
  electronics: "Electronics",
  "home-decor": "Home & Decor",
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const products = categoryProducts[categoryId || ""] || [];
  const categoryName = categoryNames[categoryId || ""] || "Category";

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
    // TODO: Implement Shopify cart functionality
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        {/* Mobile-optimized header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border p-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="touch-target"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{categoryName}</h1>
              <p className="text-sm text-muted-foreground">{products.length} items</p>
            </div>
            <Button variant="ghost" size="icon" className="touch-target">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-4 pb-20">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Coming Soon
              </h2>
              <p className="text-muted-foreground">
                Products for {categoryName} will be available soon.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;