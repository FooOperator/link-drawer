// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { linkDrawerRouter } from "./linkDrawer";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge('link-drawer.', linkDrawerRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
