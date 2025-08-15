import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, Search, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Item {
  id: string;
  name: string;
  type: 'goods' | 'service';
  unit: string;
  sellingPrice: number;
  costPrice: number;
  salesAccount: string;
  purchaseAccount: string;
  description: string;
  purchaseDescription: string;
  preferredVendor: string;
  trackInventory: boolean;
  inventoryAccount: string;
  inventoryValuationMethod: string;
  openingStock: number;
  openingStockRate: number;
  reorderPoint: number;
  stockOnHand: number;
  availableForSale: number;
  committedStock: number;
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Active Items');
  const navigate = useNavigate();

  useEffect(() => {
    const savedItems = localStorage.getItem('inventoryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (itemId: string) => {
    navigate(`/items/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    {activeFilter}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border border-border">
                  <DropdownMenuItem onClick={() => setActiveFilter('Active Items')}>
                    Active Items
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveFilter('All Items')}>
                    All Items
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveFilter('Inactive Items')}>
                    Inactive Items
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate('/items/new')} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border border-border">
                  <DropdownMenuItem>Import Items</DropdownMenuItem>
                  <DropdownMenuItem>Export Items</DropdownMenuItem>
                  <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">There are no active items.</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="rounded border-border" />
                          NAME
                        </div>
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        PURCHASE DESCRIPTION
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        PURCHASE RATE
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        DESCRIPTION
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        RATE
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        STOCK ON HAND
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm uppercase tracking-wide">
                        USAGE UNIT
                      </th>
                      <th className="w-12 p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-background">
                    {filteredItems.map((item) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => handleItemClick(item.id)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <input 
                              type="checkbox" 
                              className="rounded border-border" 
                              onChange={(e) => e.stopPropagation()}
                            />
                            <span className="font-medium text-foreground">{item.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-foreground">{item.purchaseDescription || '-'}</td>
                        <td className="p-4 text-foreground">₹{item.costPrice.toFixed(2)}</td>
                        <td className="p-4 text-foreground">{item.description || '-'}</td>
                        <td className="p-4 text-foreground">₹{item.sellingPrice.toFixed(2)}</td>
                        <td className="p-4 text-foreground">{item.stockOnHand.toFixed(2)}</td>
                        <td className="p-4 text-foreground">{item.unit}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Items;