import { z } from "zod";

export const createWalletSchema = z.object({
  userId: z.number().int(),
  stockId: z.number().int(),
  quantity: z.number().int(),
});
