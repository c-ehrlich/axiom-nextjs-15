import axiomClient from "~/lib/axiom/axiom";
import { Logger, AxiomJSTransport } from "@axiomhq/logging";
import {
  createAxiomRouteHandler,
  serverContextFieldsFormatter,
} from "@axiomhq/nextjs";

export const logger = new Logger({
  transports: [
    new AxiomJSTransport({
      axiom: axiomClient,
      dataset: process.env.NEXT_PUBLIC_AXIOM_DATASET!,
    }),
  ],
  formatters: [serverContextFieldsFormatter],
});

export const withAxiom = createAxiomRouteHandler(logger);
