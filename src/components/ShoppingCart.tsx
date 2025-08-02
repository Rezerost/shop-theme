import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}
interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}
export function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;
  return <Card className="w-full max-w-md bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-foreground">My Cart</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {items.length === 0 ? <p className="text-muted-foreground text-center py-8">Your cart is empty</p> : <>
            <div className="space-y-5 max-h-96 overflow-y-visible rounded-lg ">
              {items.map(item => <div key={item.id} className="flex items-center space-x--3 p-3 bg-secondary/30 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                    {item.size && <p className="text-sm text-muted-foreground">SIZE {item.size}</p>}
                    <p className="text-sm font-semibold text-primary">${item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-8 text-center text-sm font-medium text-foreground">
                      {item.quantity}
                    </span>
                    
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                    
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onRemoveItem(item.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>)}
            </div>
            
            <Separator className="bg-border" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sub Total</span>
                <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <Separator className="bg-border" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full mt-4" variant="premium" onClick={onCheckout}>
              Checkout
            </Button>
          </>}
      </CardContent>
    </Card>;
}