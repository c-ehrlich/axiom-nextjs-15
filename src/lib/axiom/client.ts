"use client";
import axiomClient from "~/lib/axiom/axiom";
import { Logger, AxiomJSTransport } from "@axiomhq/logging";
import { createUseLogger, createWebVitalsComponent } from "@axiomhq/react";

export const logger = new Logger({
  transports: [
    new AxiomJSTransport({
      axiom: axiomClient,
      dataset: process.env.NEXT_PUBLIC_AXIOM_DATASET!,
    }),
  ],
});

const useLogger = createUseLogger(logger);
const WebVitals = createWebVitalsComponent(logger);

export { useLogger, WebVitals };
