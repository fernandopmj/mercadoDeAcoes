import z from "zod";

export const createTransactionSchema = z.object({
  userId: z.number().int().min(1),
  stockId: z.number().int().min(1),
  type: z.enum(["buy", "sell"]),
  quantity: z.number().int().min(1),
  pricePerStock: z.number().positive(),
});
