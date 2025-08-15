import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Edit, MoreHorizontal, X, ChevronDown } from 'lucide-react';
import { Item } from './Items';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('inventoryItems') || '[]');
    const foundItem = savedItems.find((item: Item) => item.id === id);
    setItem(foundItem);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-muted-foreground">Item not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">+</span>
                </div>
                <span className="text-muted-foreground">•••</span>
                <h1 className="text-2xl font-bold text-foreground">{item.name}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                Adjust Stock
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    More
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border border-border">
                  <DropdownMenuItem>Edit Item</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate Item</DropdownMenuItem>
                  <DropdownMenuItem>Make Inactive</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete Item</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-3 bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-background">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-background">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Item Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Item Type</Label>
                          <p className="font-medium text-foreground capitalize">{item.type}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Unit</Label>
                          <p className="font-medium text-foreground">{item.unit}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Created Source</Label>
                          <p className="font-medium text-foreground">User</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Inventory Account</Label>
                          <p className="font-medium text-foreground">{item.inventoryAccount || 'Inventory Asset'}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Inventory Valuation Method</Label>
                          <p className="font-medium text-foreground">
                            {item.inventoryValuationMethod || 'FIFO (First In First Out)'}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Item Category</Label>
                          <p className="font-medium text-foreground">Inventory Items</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Purchase Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Purchase Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-muted-foreground">Cost Price</Label>
                        <p className="font-medium text-foreground">₹{item.costPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Purchase Account</Label>
                        <p className="font-medium text-foreground">{item.purchaseAccount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sales Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">Sales Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-muted-foreground">Selling Price</Label>
                        <p className="font-medium text-foreground">₹{item.sellingPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Sales Account</Label>
                        <p className="font-medium text-foreground">{item.salesAccount}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label className="text-muted-foreground">Description</Label>
                      <p className="font-medium text-foreground">{item.description || 'NIL'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Stock Information */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Opening Stock</Label>
                        <p className="text-2xl font-bold text-foreground">{item.openingStock.toFixed(2)}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Stock on Hand</Label>
                        <p className="text-2xl font-bold text-foreground">{item.stockOnHand.toFixed(2)}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Committed Stock</Label>
                        <p className="text-2xl font-bold text-foreground">{item.committedStock.toFixed(2)}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Available for Sale</Label>
                        <p className="text-2xl font-bold text-foreground">{item.availableForSale.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sales Stats */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-3xl font-bold text-foreground">0</p>
                        <p className="text-sm text-muted-foreground">Qty To be Invoiced</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-foreground">0</p>
                        <p className="text-sm text-muted-foreground">Qty To be Billed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reorder Point */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-muted-foreground">Reorder Point</Label>
                        <p className="text-xl font-bold text-foreground">
                          {item.reorderPoint.toFixed(2)}
                          <Edit className="w-4 h-4 inline ml-2 text-muted-foreground" />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="space-y-4">
              {/* Filter Section */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-muted-foreground">Filter By:</Label>
                  <Select defaultValue="quotes">
                    <SelectTrigger className="w-32 bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="quotes">Quotes</SelectItem>
                      <SelectItem value="invoices">Invoices</SelectItem>
                      <SelectItem value="bills">Bills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-muted-foreground">Status:</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-24 bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Transactions Table */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">There are no quotes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No history available for this item.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Label = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => (
  <label className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);

export default ItemDetail;