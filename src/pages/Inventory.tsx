
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

// Sample inventory data
const inventoryItems = [
  { id: 1, name: 'Ground Beef', category: 'Meats', currentStock: 5, minStock: 10, unit: 'kg', price: 12.99, status: "Critical" },
  { id: 2, name: 'Lettuce', category: 'Vegetables', currentStock: 8, minStock: 10, unit: 'kg', price: 4.99, status: "Low" },
  { id: 3, name: 'Tomatoes', category: 'Vegetables', currentStock: 12, minStock: 10, unit: 'kg', price: 3.50, status: "OK" },
  { id: 4, name: 'Chicken Breast', category: 'Meats', currentStock: 3, minStock: 15, unit: 'kg', price: 9.99, status: "Critical" },
  { id: 5, name: 'Potatoes', category: 'Vegetables', currentStock: 18, minStock: 20, unit: 'kg', price: 2.99, status: "Low" },
  { id: 6, name: 'White Rice', category: 'Grains', currentStock: 25, minStock: 10, unit: 'kg', price: 5.50, status: "OK" },
  { id: 7, name: 'Onions', category: 'Vegetables', currentStock: 15, minStock: 10, unit: 'kg', price: 1.99, status: "OK" },
  { id: 8, name: 'Butter', category: 'Dairy', currentStock: 7, minStock: 10, unit: 'kg', price: 8.99, status: "Low" },
  { id: 9, name: 'Cheese', category: 'Dairy', currentStock: 12, minStock: 10, unit: 'kg', price: 7.50, status: "OK" },
  { id: 10, name: 'Salmon Fillet', category: 'Seafood', currentStock: 4, minStock: 8, unit: 'kg', price: 24.99, status: "Low" },
];

const Inventory = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-500 mt-2">Track stock levels and order supplies</p>
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
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All</Button>
                <Button variant="outline" className="text-red-500 border-red-300">Critical</Button>
                <Button variant="outline" className="text-orange-500 border-orange-300">Low Stock</Button>
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
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="bg-white border-b">
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3">{item.currentStock}</td>
                      <td className="px-4 py-3">{item.minStock}</td>
                      <td className="px-4 py-3">{item.unit}</td>
                      <td className="px-4 py-3">${item.price}</td>
                      <td className="px-4 py-3">
                        <Badge variant={
                          item.status === "Critical" ? "destructive" :
                          item.status === "Low" ? "outline" : "secondary"
                        } className={
                          item.status === "Critical" ? "bg-red-500" :
                          item.status === "Low" ? "border-orange-400 text-orange-500" :
                          "bg-green-100 text-green-800 border-green-300"
                        }>
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inventory;
