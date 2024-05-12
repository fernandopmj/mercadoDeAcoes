export interface Transaction {
  id?: number;
  userId: number;
  stockId: number;
  type: "buy" | "sell";
  quantity: number;
  pricePerStock: number;
  timestamp: Date;
}
