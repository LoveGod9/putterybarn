
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  sold: number;
  profit: number;
  total: number;
}

interface TopSellingItemsProps {
  items: MenuItem[];
}

const TopSellingItems = ({ items }: TopSellingItemsProps) => {
  // Sort items by sold count in descending order
  const sortedItems = [...items].sort((a, b) => b.sold - a.sold);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.sold} sold</p>
                  <p className="text-xs text-gray-500">${item.profit.toFixed(2)} profit</p>
                </div>
              </div>
              <Progress value={(item.sold / item.total) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingItems;
