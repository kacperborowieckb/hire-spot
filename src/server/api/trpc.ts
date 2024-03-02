/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
// eslint-disable-next-line
import { getAuth } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type AuthObject = ReturnType<typeof getAuth>;

interface CreateContextOptions {
  headers: Headers;
  currentUser: string | null;
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    headers: opts.headers,
    currentUser: opts.currentUser,
    db,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async ({
  headers,
  auth,
}: {
  headers: Headers;
  auth: AuthObject;
  // eslint-disable-next-line
}) => {
  // Fetch stuff that depends on the request

  return createInnerTRPCContext({
    headers: headers,
    currentUser: auth.userId,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const enforceUserIsSignedIn = t.middleware(({ ctx, next }) => {
  if (!ctx.currentUser) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: { currentUser: ctx.currentUser },
  });
});

const enforceUserIsCreatorOfRecruitment = t.middleware(
  async ({ ctx, next, rawInput }) => {
    if (!ctx.currentUser) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const recruitmentId = (rawInput as { recruitmentId: string }).recruitmentId;
    const recruitmentData = await ctx.db.recruitment.findUnique({
      where: { id: recruitmentId },
      include: { creator: true },
    });

    if (recruitmentData?.creator.id !== ctx.currentUser) {
      throw new TRPCError({ code: "CONFLICT" });
    }

    return next({
      ctx: { currentUser: ctx.currentUser },
    });
  },
);

const enforceUserHaveAccessToCandidateDate = t.middleware(
  async ({ ctx, next, rawInput }) => {
    if (!ctx.currentUser) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const candidateId = (rawInput as { candidateId: string }).candidateId;
    const candidate = await ctx.db.candidate.findUnique({
      where: { id: candidateId },
      include: { recruitment: true },
    });

    if (candidate?.recruitment.creatorId !== ctx.currentUser) {
      throw new TRPCError({ code: "CONFLICT" });
    }

    return next({ ctx: { currentUser: ctx.currentUser } });
  },
);

export const privateProcedure = t.procedure.use(enforceUserIsSignedIn);
export const creatorProcedure = t.procedure.use(
  enforceUserIsCreatorOfRecruitment,
);
export const candidateAccessProcedure = t.procedure.use(
  enforceUserHaveAccessToCandidateDate,
);
