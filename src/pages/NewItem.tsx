import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Item } from './Items';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const NewItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: 'goods' as 'goods' | 'service',
    unit: '',
    sellingPrice: '',
    costPrice: '',
    salesAccount: 'Sales',
    purchaseAccount: 'Cost of Goods Sold',
    description: '',
    purchaseDescription: '',
    preferredVendor: '',
    trackInventory: false,
    inventoryAccount: '',
    inventoryValuationMethod: '',
    openingStock: '',
    openingStockRate: '',
    reorderPoint: '',
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      unit: formData.unit,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      costPrice: parseFloat(formData.costPrice) || 0,
      salesAccount: formData.salesAccount,
      purchaseAccount: formData.purchaseAccount,
      description: formData.description,
      purchaseDescription: formData.purchaseDescription,
      preferredVendor: formData.preferredVendor,
      trackInventory: formData.trackInventory,
      inventoryAccount: formData.inventoryAccount,
      inventoryValuationMethod: formData.inventoryValuationMethod,
      openingStock: parseFloat(formData.openingStock) || 0,
      openingStockRate: parseFloat(formData.openingStockRate) || 0,
      reorderPoint: parseFloat(formData.reorderPoint) || 0,
      stockOnHand: parseFloat(formData.openingStock) || 0,
      availableForSale: parseFloat(formData.openingStock) || 0,
      committedStock: 0,
    };

    const existingItems = JSON.parse(localStorage.getItem('inventoryItems') || '[]');
    const updatedItems = [...existingItems, newItem];
    localStorage.setItem('inventoryItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Success!",
      description: "Item saved successfully.",
      className: "bg-success text-success-foreground border-success",
    });

    // Redirect to items page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Items
          </Button>
          <h1 className="text-2xl font-bold text-foreground">New Item</h1>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Type Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="font-medium">Type</Label>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="goods" id="goods" />
                  <Label htmlFor="goods">Goods</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="service" id="service" />
                  <Label htmlFor="service">Service</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-red-500 font-medium">Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-primary/20 focus:border-primary"
              />
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="font-medium">Unit</Label>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or type to add" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border">
                  <SelectItem value="box">box</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="pieces">pieces</SelectItem>
                  <SelectItem value="liters">liters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sales and Purchase Information */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sales Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sales-info" 
                    checked={true}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="sales-info" className="font-medium">Sales Information</Label>
                </div>

                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label className="text-red-500 font-medium">Selling Price*</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-muted-foreground">
                        INR
                      </span>
                      <Input
                        value={formData.sellingPrice}
                        onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                        className="rounded-l-none"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-500 font-medium">Account*</Label>
                    <Select value={formData.salesAccount} onValueChange={(value) => handleInputChange('salesAccount', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border">
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Revenue">Revenue</SelectItem>
                        <SelectItem value="Income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Purchase Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="purchase-info" 
                    checked={true}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="purchase-info" className="font-medium">Purchase Information</Label>
                </div>

                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label className="text-red-500 font-medium">Cost Price*</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-muted-foreground">
                        INR
                      </span>
                      <Input
                        value={formData.costPrice}
                        onChange={(e) => handleInputChange('costPrice', e.target.value)}
                        className="rounded-l-none"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-500 font-medium">Account*</Label>
                    <Select value={formData.purchaseAccount} onValueChange={(value) => handleInputChange('purchaseAccount', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border">
                        <SelectItem value="Cost of Goods Sold">Cost of Goods Sold</SelectItem>
                        <SelectItem value="Purchases">Purchases</SelectItem>
                        <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.purchaseDescription}
                      onChange={(e) => handleInputChange('purchaseDescription', e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Vendor</Label>
                    <Select value={formData.preferredVendor} onValueChange={(value) => handleInputChange('preferredVendor', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border">
                        <SelectItem value="Vendor 1">Vendor 1</SelectItem>
                        <SelectItem value="Vendor 2">Vendor 2</SelectItem>
                        <SelectItem value="Vendor 3">Vendor 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Track Inventory */}
            <div className="space-y-4 border-t pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="track-inventory"
                    checked={formData.trackInventory}
                    onCheckedChange={(checked) => handleInputChange('trackInventory', checked)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="track-inventory" className="font-medium">Track Inventory for this item</Label>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </div>

                {formData.trackInventory && (
                  <div className="grid md:grid-cols-2 gap-6 pl-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-red-500 font-medium">Inventory Account*</Label>
                        <Select value={formData.inventoryAccount} onValueChange={(value) => handleInputChange('inventoryAccount', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an account" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border border-border">
                            <SelectItem value="Inventory Asset">Inventory Asset</SelectItem>
                            <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                            <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Opening Stock</Label>
                        <Input
                          value={formData.openingStock}
                          onChange={(e) => handleInputChange('openingStock', e.target.value)}
                          type="number"
                          step="0.01"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Reorder Point</Label>
                        <Input
                          value={formData.reorderPoint}
                          onChange={(e) => handleInputChange('reorderPoint', e.target.value)}
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-red-500 font-medium">
                          Inventory Valuation Method*
                        </Label>
                        <Select value={formData.inventoryValuationMethod} onValueChange={(value) => handleInputChange('inventoryValuationMethod', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the valuation method" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border border-border">
                            <SelectItem value="FIFO">FIFO (First In First Out)</SelectItem>
                            <SelectItem value="LIFO">LIFO (Last In First Out)</SelectItem>
                            <SelectItem value="Average">Average Cost</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Opening Stock Rate per Unit</Label>
                        <Input
                          value={formData.openingStockRate}
                          onChange={(e) => handleInputChange('openingStockRate', e.target.value)}
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                  Save Item
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewItem;