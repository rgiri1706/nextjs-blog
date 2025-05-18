

import { z } from "zod";

export const formSchema = z.object({
   title: z.string().min(3),
   description: z.string().min(3),
   category: z.string().min(3),
   link: z.string().url(),
   pitch: z.string().min(10),
})