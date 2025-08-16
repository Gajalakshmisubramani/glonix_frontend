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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:bg-muted">
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

        {/* Table Container */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex items-center px-6 py-3">
              <div className="flex items-center gap-3 w-8">
                <input type="checkbox" className="rounded border-gray-300" />
              </div>
              <div className="flex-1 grid grid-cols-7 gap-4 text-sm font-medium text-gray-600 uppercase tracking-wide">
                <div>NAME</div>
                <div>PURCHASE DESCRIPTION</div>
                <div>PURCHASE RATE</div>
                <div>DESCRIPTION</div>
                <div>RATE</div>
                <div>STOCK ON HAND</div>
                <div>USAGE UNIT</div>
              </div>
              <div className="w-8 flex justify-center">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Table Content */}
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-lg">There are no active items.</p>
            </div>
          ) : (
            <div>
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex items-center px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${index === filteredItems.length - 1 ? 'border-b-0' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="flex items-center gap-3 w-8">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300" 
                      onChange={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-7 gap-4 text-sm">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-gray-600">{item.purchaseDescription || '-'}</div>
                    <div className="text-gray-600">₹{item.costPrice.toFixed(2)}</div>
                    <div className="text-gray-600">{item.description || '-'}</div>
                    <div className="text-gray-600">₹{item.sellingPrice.toFixed(2)}</div>
                    <div className="text-gray-600">{item.stockOnHand.toFixed(2)}</div>
                    <div className="text-gray-600">{item.unit}</div>
                  </div>
                  <div className="w-8 flex justify-center">
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;