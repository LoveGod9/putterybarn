
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AddInventoryForm from '@/components/inventory/AddInventoryForm';

// Define the inventory item interface
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  current_stock: number;
  min_stock: number;
  unit: string;
  price: number;
  status: "Critical" | "Low" | "OK";
  created_at: string;
  updated_at: string;
}

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [formOpen, setFormOpen] = useState(false);
  const { toast } = useToast();

  // Fetch inventory items from Supabase
  const fetchInventoryItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setInventoryItems(data || []);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch inventory items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  // Filter inventory items based on search term and active filter
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Critical') return matchesSearch && item.status === 'Critical';
    if (activeFilter === 'Low Stock') return matchesSearch && item.status === 'Low';
    
    return matchesSearch;
  });

  // Handle form submission success
  const handleFormSuccess = () => {
    fetchInventoryItems();
  };

  // Get badge variant based on status
  const getBadgeVariant = (status: string) => {
    if (status === "Critical") return { variant: "destructive", className: "bg-red-500" };
    if (status === "Low") return { variant: "outline" as const, className: "border-orange-400 text-orange-500" };
    return { variant: "secondary" as const, className: "bg-green-100 text-green-800 border-green-300" };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-gray-500 mt-2">Track stock levels and order supplies</p>
          </div>
          <Button onClick={() => setFormOpen(true)} className="flex items-center gap-2">
            <Plus size={16} />
            Add Item
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search inventory items..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={activeFilter === "All" ? "default" : "outline"} 
                  onClick={() => setActiveFilter("All")}
                >
                  All
                </Button>
                <Button 
                  variant={activeFilter === "Critical" ? "default" : "outline"} 
                  className={activeFilter === "Critical" ? "" : "text-red-500 border-red-300"}
                  onClick={() => setActiveFilter("Critical")}
                >
                  Critical
                </Button>
                <Button 
                  variant={activeFilter === "Low Stock" ? "default" : "outline"} 
                  className={activeFilter === "Low Stock" ? "" : "text-orange-500 border-orange-300"}
                  onClick={() => setActiveFilter("Low Stock")}
                >
                  Low Stock
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-8">
                <p>Loading inventory items...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No inventory items found.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFormOpen(true)} 
                  className="mt-4"
                >
                  Add Your First Item
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Current Stock</th>
                      <th className="px-4 py-3">Min Stock</th>
                      <th className="px-4 py-3">Unit</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="bg-white border-b">
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3">{item.category}</td>
                        <td className="px-4 py-3">{item.current_stock}</td>
                        <td className="px-4 py-3">{item.min_stock}</td>
                        <td className="px-4 py-3">{item.unit}</td>
                        <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant={getBadgeVariant(item.status).variant} 
                            className={getBadgeVariant(item.status).className}
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Update</Button>
                            <Button variant="outline" size="sm" className="text-green-600">Order</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddInventoryForm 
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={handleFormSuccess}
      />
    </Layout>
  );
};

export default Inventory;
