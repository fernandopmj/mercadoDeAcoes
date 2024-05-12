import z from "zod";

const schema = z.object({
  API_PORT: z.string().min(4),
});

export const env = schema.parse(process.env);
