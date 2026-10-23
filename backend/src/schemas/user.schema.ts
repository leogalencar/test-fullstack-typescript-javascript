import * as z from "zod";

const User = z.object({
    name: z.string(),
    email: z.email(),
    role: z.string().optional(),
});
