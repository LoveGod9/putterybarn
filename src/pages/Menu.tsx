
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Search } from 'lucide-react';

// Sample menu data
const menuItems = [
  { 
    id: 1, 
    name: 'Signature Burger', 
    category: 'Main Course', 
    price: 16.99, 
    cost: 5.85,
    profit: 11.14, 
    profitMargin: 65.6,
    sold: 145,
    popularity: 85
  },
  { 
    id: 2, 
    name: 'Truffle Fries', 
    category: 'Sides', 
    price: 9.99, 
    cost: 3.85,
    profit: 6.14, 
    profitMargin: 61.5,
    sold: 120,
    popularity: 75
  },
  { 
    id: 3, 
    name: 'Classic Mojito', 
    category: 'Beverages', 
    price: 12.99, 
    cost: 3.99,
    profit: 9.00, 
    profitMargin: 69.3,
    sold: 98,
    popularity: 65
  },
  { 
    id: 4, 
    name: 'Chocolate Lava Cake', 
    category: 'Desserts', 
    price: 10.99, 
    cost: 2.99,
    profit: 8.00, 
    profitMargin: 72.8,
    sold: 75,
    popularity: 60
  },
  { 
    id: 5, 
    name: 'Caesar Salad', 
    category: 'Starters', 
    price: 12.99, 
    cost: 4.25,
    profit: 8.74, 
    profitMargin: 67.3,
    sold: 68,
    popularity: 55
  },
  { 
    id: 6, 
    name: 'Grilled Salmon', 
    category: 'Main Course', 
    price: 24.99, 
    cost: 9.75,
    profit: 15.24, 
    profitMargin: 61.0,
    sold: 60,
    popularity: 50
  },
];

// Categories
const categories = ['All', 'Main Course', 'Sides', 'Beverages', 'Desserts', 'Starters'];

const Menu = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Menu Engineering</h1>
          <p className="text-gray-500 mt-2">Analyze and optimize your menu performance</p>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="items">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="analysis">Profitability Analysis</TabsTrigger>
          </TabsList>
          
          {/* Menu Items Tab */}
          <TabsContent value="items" className="space-y-4 mt-6">
            {/* Search and Filter */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search menu items..." 
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                      <Button 
                        key={category} 
                        variant={category === 'All' ? "default" : "outline"}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Menu Items Table */}
            <Card>
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Cost</th>
                        <th className="px-4 py-3">Profit</th>
                        <th className="px-4 py-3">Units Sold</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id} className="bg-white border-b">
                          <td className="px-4 py-3 font-medium">{item.name}</td>
                          <td className="px-4 py-3">{item.category}</td>
                          <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-3">${item.cost.toFixed(2)}</td>
                          <td className="px-4 py-3">${item.profit.toFixed(2)} ({item.profitMargin.toFixed(1)}%)</td>
                          <td className="px-4 py-3">{item.sold}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Disable</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6 mt-6">
            {/* Profitability Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Profitable Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...menuItems]
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 5)
                      .map((item, index) => (
                        <div key={item.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-green-600 font-medium">${item.profit.toFixed(2)}</span>
                          </div>
                          <Progress value={100 - (index * 15)} className="h-2" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...menuItems]
                      .sort((a, b) => b.sold - a.sold)
                      .slice(0, 5)
                      .map((item, index) => (
                        <div key={item.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.name}</span>
                            <span className="font-medium">{item.sold} sold</span>
                          </div>
                          <Progress value={100 - (index * 15)} className="h-2" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Menu Optimization Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Menu Optimization Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Highlight Signature Burger</h4>
                      <p className="text-muted-foreground text-sm">Your most popular and profitable item should be featured prominently on the menu.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Bundle Truffle Fries</h4>
                      <p className="text-muted-foreground text-sm">Create a combo deal with your popular sides to increase average order value.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Review Grilled Salmon pricing</h4>
                      <p className="text-muted-foreground text-sm">Consider adjusting the price to improve the profit margin while maintaining competitiveness.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Menu;
