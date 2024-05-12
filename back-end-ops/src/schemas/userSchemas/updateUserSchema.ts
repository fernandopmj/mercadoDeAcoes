import z from "zod";

export const updateUserSchema = z.object({
  id: z.number().int().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email(),
  status: z.boolean().optional(),
  dateDesactivate: z.number().optional(),
  balance: z.number(),
});
