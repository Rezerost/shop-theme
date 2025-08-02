import { useState, useEffect } from "react";
import { Search, Bell, Crown, Settings, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { FeaturedSection } from "@/components/FeaturedSection";
import { CategorySelector } from "@/components/CategorySelector";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import product images
import monocleBag from "@/assets/monocle-bag.jpg";
import squareOneBag from "@/assets/square-one-bag.jpg";
import sportyRichBag from "@/assets/sporty-rich-bag.jpg";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

const products = [
  {
    id: "1",
    name: "Monocle Canvas Tote Bag",
    price: 213.99,
    rating: 4.9,
    reviews: 128,
    image: monocleBag,
  },
  {
    id: "2",
    name: "Square One District Tote",
    price: 189.99,
    rating: 4.9,
    reviews: 96,
    image: squareOneBag,
  },
  {
    id: "3",
    name: "Sporty & Rich Canvas Tote",
    price: 221.99,
    rating: 4.9,
    reviews: 156,
    image: sportyRichBag,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Monocle Canvas Tote Bag",
      price: 213.99,
      quantity: 1,
      image: monocleBag,
    },
    {
      id: "2",
      name: "Square One District Tote",
      price: 189.99,
      quantity: 1,
      image: squareOneBag,
      size: "M",
    },
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Shopify-compatible search functionality
  useEffect(() => {
    // Shopify Storefront API placeholder - will be configured post-export
    // TODO: Replace with actual Shopify product search query
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    console.log('Shopify API: Searching products for:', searchQuery);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((items) => [
        ...items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]);
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddUpsell = (upsellItem: any) => {
    const existingItem = cartItems.find(item => item.id === upsellItem.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === upsellItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: upsellItem.id,
        name: upsellItem.name,
        price: upsellItem.price,
        quantity: 1,
        image: upsellItem.image
      }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${upsellItem.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Proceeding to checkout...",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Hi, Dollar! 👋
              </h1>
              <p className="text-muted-foreground text-sm">Welcome Back</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative max-w-md hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-10 bg-secondary/50 border-border"
                />
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer hover:text-primary" />
              </div>

              <CartDrawer
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                onAddUpsell={handleAddUpsell}
              />

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
              </Button>

              <Button
                variant="premium"
                size="sm"
                onClick={() => navigate("/admin")}
                className="hidden md:inline-flex"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </Button>

              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">D</span>
              </div>
            </div>
          </div>
        </header>

            {/* Main Content Area - Mobile optimized */}
        <div className="flex">
          <main className="flex-1 p-3 sm:p-4 md:p-6 pb-20">
            <FeaturedSection />

            <CategorySelector />

            {/* Popular Collection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Popular Collection
                </h2>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80"
                >
                  See All
                </Button>
              </div>

              {/* Single column on mobile, responsive grid on larger screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No products found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Index;
