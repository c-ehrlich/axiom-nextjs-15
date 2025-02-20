import { type Logger } from "@axiomhq/logging";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { logger, withAxiom } from "~/lib/axiom/server";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async ({
  req,
  log,
}: {
  req: NextRequest;
  log: Logger;
}) => {
  return createTRPCContext({
    req: { headers: req.headers },
    log: log,
  });
};

const handler = withAxiom((req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ req, log: logger }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  }),
);

export { handler as GET, handler as POST };
