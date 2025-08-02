import { useState } from "react";
import { ArrowLeft, Plus, Minus, Heart, Share2, Star, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Import product images
import monocleBag from "@/assets/monocle-bag.jpg";
import squareOneBag from "@/assets/square-one-bag.jpg";
import sportyRichBag from "@/assets/sporty-rich-bag.jpg";

const products = [
  {
    id: "1",
    name: "Monocle Canvas Tote Bag",
    price: 213.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviews: 128,
    image: monocleBag,
    colors: ["Black", "Navy", "Brown", "Beige"],
    sizes: ["S", "M", "L"],
    description: "Premium canvas tote bag with leather handles and reinforced stitching.",
    seller: "MonocleOfficial",
    inStock: true,
  },
  {
    id: "2", 
    name: "Square One District Tote",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 96,
    image: squareOneBag,
    colors: ["Black", "White", "Gray", "Red"],
    sizes: ["S", "M", "L", "XL"],
    description: "Minimalist design meets functionality in this urban tote bag.",
    seller: "SquareOneDesign",
    inStock: true,
  },
  {
    id: "3",
    name: "Sporty & Rich Canvas Tote",
    price: 221.99,
    originalPrice: 279.99,
    rating: 4.9,
    reviews: 156,
    image: sportyRichBag,
    colors: ["White", "Black", "Green", "Pink"],
    sizes: ["M", "L"],
    description: "Luxury athletic-inspired tote bag with premium materials.",
    seller: "SportyRichOfficial",
    inStock: true,
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === id);
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedColor}, ${selectedSize}) x${quantity} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure checkout...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-muted/20">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            
            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <div className="aspect-square bg-muted/20">
                    <img 
                      src={product.image} 
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Seller Info */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-gradient-accent text-white">
                {product.seller}
              </Badge>
              <Button variant="ghost" size="sm" className="text-xs">
                ENTER SHOP
              </Button>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-muted-foreground"
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge variant="destructive" className="text-white">
                  -{discountPercentage}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Orders Paid Between 09:00-18:00 Will Be Processed in 6 Hours
              </p>
            </div>

            {/* Shipping Info */}
            <Card className="p-4 bg-secondary/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs">1</span>
                  <span>Seller:</span>
                  <span className="font-medium">{product.seller} designated warehouse</span>
                  <span className="text-muted-foreground">Freight: Free</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs">2</span>
                  <span>Your Address:</span>
                  <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                    Estimate International Shipping Fee
                  </Button>
                </div>
              </div>
            </Card>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Color</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.colors.map((color) => (
                  <Card 
                    key={color}
                    className={`cursor-pointer transition-all ${
                      selectedColor === color 
                        ? "ring-2 ring-primary shadow-glow" 
                        : "hover:shadow-card"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div className="aspect-square p-2">
                      <div className={`w-full h-full rounded ${
                        color === "Black" ? "bg-black" :
                        color === "White" ? "bg-white border" :
                        color === "Navy" ? "bg-blue-900" :
                        color === "Brown" ? "bg-amber-800" :
                        color === "Beige" ? "bg-amber-100" :
                        color === "Gray" ? "bg-gray-500" :
                        color === "Red" ? "bg-red-500" :
                        color === "Green" ? "bg-green-600" :
                        color === "Pink" ? "bg-pink-400" : "bg-gray-300"
                      }`} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                MINIMUM PURCHASE QUANTITY: 1
              </p>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Leaving A Message</h3>
              <Textarea
                placeholder="If You Have Any Other Needs, Please Leave A Message In The Remarks, Agent Will Assist You With The Inquiry."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="default" 
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Product Description */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-2">Product Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;