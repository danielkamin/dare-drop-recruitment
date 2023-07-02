import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import { type NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import { type IncomingMessage } from "http";
import type ws from "ws";
import { prisma } from "~/server/db";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (
  opts:
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>
    | trpcNext.CreateNextContextOptions
) => {
  const session = null;

  return {
    session,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
