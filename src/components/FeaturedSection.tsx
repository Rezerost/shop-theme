import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function FeaturedSection() {
  const navigate = useNavigate();

  const handleToteBagCollection = () => {
    // Shopify Storefront API placeholder - will be configured post-export
    // TODO: Replace with actual Shopify collection query
    console.log('Shopify API: Fetching tote bag collection...');
    navigate('/product/1'); // Navigate to featured tote bag for now
  };

  const handleFlashSale = () => {
    // Shopify Storefront API placeholder for flash sale products
    // TODO: Replace with actual Shopify discount query
    console.log('Shopify API: Fetching flash sale products...');
    navigate('/product/3'); // Navigate to sale product for now
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Tote Bag Collection */}
      <Card className="bg-gradient-card border-border shadow-card overflow-hidden group">
        <CardContent className="p-6">
          <div className="bg-accent/10 text-accent text-xs font-medium px-2 py-1 rounded-full inline-block mb-4">
            BEST OFFERS
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Tote Bag Collection
          </h2>
          <p className="text-muted-foreground mb-6">
            Join and discover the best product according to your passion
          </p>
          <Button 
            variant="default" 
            className="group-hover:scale-105 transition-transform"
            onClick={handleToteBagCollection}
          >
            See More
          </Button>
        </CardContent>
      </Card>

      {/* Flash Sale */}
      <Card className="bg-gradient-accent border-border shadow-glow overflow-hidden group">
        <CardContent className="p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Flash Sale ⚡
              </h2>
              <div className="text-4xl font-bold mb-4">75% OFF</div>
              <Button 
                variant="outline" 
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={handleFlashSale}
              >
                Buy Now!
              </Button>
            </div>
            <div className="text-6xl opacity-20">⚡</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}