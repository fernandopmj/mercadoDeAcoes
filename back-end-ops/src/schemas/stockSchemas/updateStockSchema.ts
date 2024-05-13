import z from "zod";

export const updateStockSchema = z.object({
  id: z.number().int().min(1),
  currentPrice: z.number(),
});
