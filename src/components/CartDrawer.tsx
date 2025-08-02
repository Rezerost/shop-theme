import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface UpsellItem {
  id: string;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
}

interface CartDrawerProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onAddUpsell: (item: UpsellItem) => void;
}

const upsellItems: UpsellItem[] = [
  {
    id: "upsell-1",
    name: "Canvas Wallet",
    price: 45,
    originalPrice: 60,
    image: "/placeholder.svg"
  },
  {
    id: "upsell-2", 
    name: "Canvas Keychain",
    price: 15,
    originalPrice: 25,
    image: "/placeholder.svg"
  }
];

export function CartDrawer({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onAddUpsell
}: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-6 w-6" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-left flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-lg mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mb-6">Add some products to get started</p>
              <Button onClick={() => setIsOpen(false)} variant="default">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                      {item.size && (
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                      )}
                      {item.color && (
                        <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      )}
                      <p className="text-sm font-semibold text-primary">${item.price}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive ml-auto"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Upsell Section */}
                {items.length > 0 && (
                  <div className="border-t border-border pt-4 mt-6">
                    <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <span>✨</span>
                      Complete your look
                    </h3>
                    <div className="space-y-3">
                      {upsellItems.map((upsell) => (
                        <div key={upsell.id} className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg border border-accent/30">
                          <img 
                            src={upsell.image} 
                            alt={upsell.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground">{upsell.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-primary">${upsell.price}</span>
                              {upsell.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${upsell.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onAddUpsell(upsell)}
                            className="text-xs"
                          >
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Summary & Checkout */}
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">
                      {shipping === 0 ? (
                        <span className="text-accent font-semibold">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {subtotal < 100 && subtotal > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                  
                  <Separator className="bg-border" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    variant="premium"
                    onClick={() => {
                      onCheckout();
                      setIsOpen(false);
                    }}
                  >
                    Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}