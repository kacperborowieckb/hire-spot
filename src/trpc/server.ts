import {
  TRPCClientError,
  createTRPCProxyClient,
  loggerLink,
} from "@trpc/client";
import { cookies, headers } from "next/headers";
import { appRouter, type AppRouter } from "~/server/api/root";
import { transformer } from "./shared";
import { cache } from "react";
import { createTRPCContext } from "~/server/api/trpc";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { observable } from "@trpc/server/observable";
import { callProcedure } from "@trpc/server";
// eslint-disable-next-line
import { TRPCErrorResponse } from "@trpc/server/rpc";

const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "rsc",
    }),
    auth: getAuth(
      new NextRequest("https://notused.com", { headers: headers() }),
    ),
  });
});

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    () =>
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                rawInput: op.input,
                ctx,
                type: op.type,
              });
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
