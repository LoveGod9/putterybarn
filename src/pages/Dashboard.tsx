
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import TopSellingItems from '@/components/dashboard/TopSellingItems';
import InventoryStatus from '@/components/dashboard/InventoryStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, Calendar } from 'lucide-react';

// Sample data for the dashboard
const dailySalesData = [
  { name: 'Mon', sales: 3200 },
  { name: 'Tue', sales: 4500 },
  { name: 'Wed', sales: 3800 },
  { name: 'Thu', sales: 5100 },
  { name: 'Fri', sales: 6200 },
  { name: 'Sat', sales: 7800 },
  { name: 'Sun', sales: 5400 },
];

const weeklySalesData = [
  { name: 'Week 1', sales: 24000 },
  { name: 'Week 2', sales: 26800 },
  { name: 'Week 3', sales: 29500 },
  { name: 'Week 4', sales: 32000 },
];

const monthlySalesData = [
  { name: 'Jan', sales: 98000 },
  { name: 'Feb', sales: 85000 },
  { name: 'Mar', sales: 92000 },
  { name: 'Apr', sales: 88000 },
  { name: 'May', sales: 105000 },
  { name: 'Jun', sales: 118000 },
  { name: 'Jul', sales: 125000 },
];

const topSellingItems = [
  { id: 1, name: 'Signature Burger', category: 'Main Course', sold: 145, profit: 1160, total: 200 },
  { id: 2, name: 'Truffle Fries', category: 'Sides', sold: 120, profit: 720, total: 200 },
  { id: 3, name: 'Classic Mojito', category: 'Beverages', sold: 98, profit: 882, total: 150 },
  { id: 4, name: 'Chocolate Lava Cake', category: 'Desserts', sold: 75, profit: 600, total: 100 }
];

const inventoryItems = [
  { id: 1, name: 'Ground Beef', category: 'Meats', currentStock: 5, minStock: 10, status: "Critical" as const },
  { id: 2, name: 'Lettuce', category: 'Vegetables', currentStock: 8, minStock: 10, status: "Low" as const },
  { id: 3, name: 'Tomatoes', category: 'Vegetables', currentStock: 12, minStock: 10, status: "OK" as const },
  { id: 4, name: 'Chicken Breast', category: 'Meats', currentStock: 3, minStock: 15, status: "Critical" as const },
  { id: 5, name: 'Potatoes', category: 'Vegetables', currentStock: 18, minStock: 20, status: "Low" as const }
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome to Puttery Barn Restaurant Admin</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Revenue"
            value="$5,280"
            icon={<DollarSign className="text-puttery-600" size={24} />}
            percentageChange={12.5}
          />
          <StatCard
            title="Total Orders"
            value="182"
            icon={<ShoppingBag className="text-puttery-600" size={24} />}
            percentageChange={8.2}
          />
          <StatCard
            title="Total Customers"
            value="96"
            icon={<Users className="text-puttery-600" size={24} />}
            percentageChange={-3.1}
          />
          <StatCard
            title="Reservations"
            value="24"
            icon={<Calendar className="text-puttery-600" size={24} />}
            percentageChange={15.8}
            gradient
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <SalesChart 
            title="Revenue Overview" 
            data={{
              daily: dailySalesData,
              weekly: weeklySalesData,
              monthly: monthlySalesData
            }}
          />
        </div>
        
        {/* Menu and Inventory Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TopSellingItems items={topSellingItems} />
          <InventoryStatus items={inventoryItems} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
