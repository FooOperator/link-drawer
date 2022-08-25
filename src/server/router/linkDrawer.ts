import { createRouter } from "./context";
import { z, ZodRawShape } from "zod";
import { createProtectedRouter } from "./protected-router";




export const linkDrawerRouter = createProtectedRouter()
    .query("getDataViaEmail", {
        input: z.string(),
        async resolve({ input }) {
            try {
                const data = await prisma?.user.findFirst({
                    where: {
                        email: input
                    }
                });
                return data;
            } catch (e) {
                console.log(e);
            }
        },
    }).query("getDataViaName", {
        input: z.string(),
        async resolve({ input }) {
            try {
                const data = await prisma?.user.findFirst({
                    where: {
                        name: input
                    }
                });
                return data;
            } catch (e) {
                console.log(e);
            }
        },
    })

