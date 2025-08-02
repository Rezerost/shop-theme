import React, { useState } from "react";
import { Plus, Edit, Trash2, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AdminProductForm } from "@/components/AdminProductForm";

interface Product {
  id: string;
  title: string;
  shopName: string;
  price: number;
  priceReducedFrom: number;
  colors: string[];
  images: string[];
  sizes: string[];
}

// Mock products data - in a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: "1",
    title: "[OG Batch] ASICS 14",
    shopName: "WindFindShoes",
    price: 43.25,
    priceReducedFrom: 65.0,
    colors: ["Silver/Green", "Black/White", "White/Blue"],
    images: ["/placeholder.svg"],
    sizes: [
      "EUR 36",
      "EUR 37",
      "EUR 38",
      "EUR 39",
      "EUR 40",
      "EUR 41",
      "EUR 42",
      "EUR 43",
      "EUR 44",
      "EUR 45",
    ],
  },
  {
    id: "2",
    title: "W2C Collection",
    shopName: "Premium Store",
    price: 213.99,
    priceReducedFrom: 0,
    colors: ["Black", "White", "Navy"],
    images: ["/placeholder.svg"],
    sizes: ["S", "M", "L", "XL"],
  },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (productData: Product) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(), // Simple ID generation
    };

    setProducts((prev) => [...prev, newProduct]);
    setShowForm(false);

    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const handleEditProduct = (productData: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productData.id ? productData : product
      )
    );
    setEditingProduct(null);
    setShowForm(false);

    toast({
      title: "Success",
      description: "Product updated successfully!",
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));

    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <h1 className="text-2xl font-bold text-foreground">
            Admin Dashboard
          </h1>

          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {showForm ? (
          <div className="mb-8">
            <AdminProductForm
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
              onCancel={handleCancel}
              initialData={editingProduct || undefined}
              mode={editingProduct ? "edit" : "add"}
            />
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-2">
                          {product.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.shopName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(product)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.priceReducedFrom > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.priceReducedFrom}
                        </span>
                      )}
                    </div>

                    {/* Colors */}
                    <div className="flex flex-wrap gap-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {color}
                        </Badge>
                      ))}
                      {product.colors.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.colors.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Sizes */}
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.slice(0, 4).map((size, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {size}
                        </Badge>
                      ))}
                      {product.sizes.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.sizes.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Images count */}
                    <div className="text-xs text-muted-foreground">
                      {product.images.length} image
                      {product.images.length !== 1 ? "s" : ""}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "No products found matching your search."
                    : "No products yet. Add your first product!"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
