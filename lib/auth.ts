import { prisma } from "@/db/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
    enabled: true, 
    minPasswordLength: 1,
  },
  user: {
    additionalFields:{
        phone: {
            type: "string",
            required: false,
            input: true,
        },
        role: {
            type: "string",
            required: false,
            defaultValue:"user",
            input: false,
        }
    },
  },
});