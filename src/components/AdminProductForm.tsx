import React, { useState } from "react";
import { Plus, X, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  id: string;
  title: string;
  shopName: string;
  price: number;
  priceReducedFrom: number;
  colors: string[];
  images: string[];
  sizes: string[];
}

interface AdminProductFormProps {
  onSubmit: (product: ProductFormData) => void;
  onCancel: () => void;
  initialData?: ProductFormData;
  mode: "add" | "edit";
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  mode,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      id: "",
      title: "",
      shopName: "",
      price: 0,
      priceReducedFrom: 0,
      colors: [""],
      images: [""],
      sizes: [""],
    }
  );

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (
    field: "colors" | "images" | "sizes",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: "colors" | "images" | "sizes") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    field: "colors" | "images" | "sizes",
    index: number
  ) => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.shopName.trim()) {
      toast({
        title: "Error",
        description: "Shop name is required",
        variant: "destructive",
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: "Error",
        description: "Price must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty values
    const cleanData = {
      ...formData,
      colors: formData.colors.filter((color) => color.trim() !== ""),
      images: formData.images.filter((image) => image.trim() !== ""),
      sizes: formData.sizes.filter((size) => size.trim() !== ""),
    };

    onSubmit(cleanData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {mode === "add" ? (
            <>
              <Plus className="h-5 w-5" />
              Add New Product
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              Edit Product
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter product title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name *</Label>
              <Input
                id="shopName"
                value={formData.shopName}
                onChange={(e) => handleInputChange("shopName", e.target.value)}
                placeholder="Enter shop name"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value) || 0)
                }
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceReducedFrom">Reduced From (USD)</Label>
              <Input
                id="priceReducedFrom"
                type="number"
                step="0.01"
                min="0"
                value={formData.priceReducedFrom}
                onChange={(e) =>
                  handleInputChange(
                    "priceReducedFrom",
                    parseFloat(e.target.value) || 0
                  )
                }
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Color Options</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("colors")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Color
              </Button>
            </div>
            <div className="space-y-2">
              {formData.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={color}
                    onChange={(e) =>
                      handleArrayChange("colors", index, e.target.value)
                    }
                    placeholder="Enter color name (e.g., Red, Blue, Green)"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem("colors", index)}
                    disabled={formData.colors.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Product Images</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("images")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </div>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={image}
                    onChange={(e) =>
                      handleArrayChange("images", index, e.target.value)
                    }
                    placeholder="Enter image URL"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem("images", index)}
                    disabled={formData.images.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Available Sizes</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("sizes")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Size
              </Button>
            </div>
            <div className="space-y-2">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={size}
                    onChange={(e) =>
                      handleArrayChange("sizes", index, e.target.value)
                    }
                    placeholder="Enter size (e.g., S, M, L, XL, EUR 42)"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem("sizes", index)}
                    disabled={formData.sizes.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Add Product" : "Update Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
