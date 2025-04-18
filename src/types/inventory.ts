
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  current_stock: number;
  min_stock: number;
  unit: string;
  price: number;
  status: string; // Changed from "Critical" | "Low" | "OK" to string
  created_at: string;
  updated_at: string;
}

export interface InventoryItemInsert {
  name: string;
  category: string;
  current_stock: number;
  min_stock: number;
  unit: string;
  price: number;
  status: string;
}
