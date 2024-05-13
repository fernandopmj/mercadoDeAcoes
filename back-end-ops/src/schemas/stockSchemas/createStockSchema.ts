import z from "zod";

export const createStockSchema = z.object({
  companyName: z.string().min(1),
  symbol: z.string().min(1),
  currentPrice: z.number(),
  description: z.string().min(1),
});
