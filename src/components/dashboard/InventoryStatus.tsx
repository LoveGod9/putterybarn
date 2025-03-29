
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  status: "Low" | "OK" | "Critical";
}

interface InventoryStatusProps {
  items: InventoryItem[];
}

const InventoryStatus = ({ items }: InventoryStatusProps) => {
  // Filter items with low or critical status
  const alertItems = items.filter(item => item.status !== "OK");
  
  // Sort by critical first then low
  const sortedItems = [...alertItems].sort((a, b) => {
    if (a.status === "Critical" && b.status !== "Critical") return -1;
    if (a.status !== "Critical" && b.status === "Critical") return 1;
    return 0;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Inventory Alerts</CardTitle>
        {sortedItems.length > 0 && (
          <Badge variant="destructive" className="flex">
            <AlertCircle size={14} className="mr-1" />
            {sortedItems.length} Alerts
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {sortedItems.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            All inventory items are at adequate levels
          </div>
        ) : (
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.currentStock} units</p>
                    <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
                  </div>
                  <Badge variant={item.status === "Critical" ? "destructive" : "outline"} className={
                    item.status === "Critical" ? "bg-red-500" : "border-orange-400 text-orange-500"
                  }>
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
