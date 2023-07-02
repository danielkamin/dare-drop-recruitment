import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { streamerSchema } from "~/server/validation/streamer";
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { type Streamer } from "@prisma/client";

interface StreamerEvents {
  create: (data: Streamer) => void;
  upvote: (data: Streamer) => void;
  downvote: (data: Streamer) => void;
}
declare interface StreamersEventEmitter {
  on<TEv extends keyof StreamerEvents>(
    event: TEv,
    listener: StreamerEvents[TEv]
  ): this;
  off<TEv extends keyof StreamerEvents>(
    event: TEv,
    listener: StreamerEvents[TEv]
  ): this;
  once<TEv extends keyof StreamerEvents>(
    event: TEv,
    listener: StreamerEvents[TEv]
  ): this;
  emit<TEv extends keyof StreamerEvents>(
    event: TEv,
    ...args: Parameters<StreamerEvents[TEv]>
  ): boolean;
}
class StreamersEventEmitter extends EventEmitter {}
const ee = new StreamersEventEmitter();

export const streamersRouter = createTRPCRouter({
  create: publicProcedure
    .input(streamerSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, description, streamingPlatform } = input;

      const streamer = await ctx.prisma.streamer.create({
        data: {
          name,
          description,
          streamingPlatform,
        },
      });
      if (!streamer) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      ee.emit("create", streamer);
      return streamer;
    }),
  onCreate: publicProcedure.subscription(() => {
    return observable<Streamer>((emit) => {
      const onCreate = (data: Streamer) => {
        emit.next(data);
      };
      ee.on("create", onCreate);
      return () => {
        ee.off("create", onCreate);
      };
    });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const streamers = await ctx.prisma.streamer.findMany({
      select: {
        id: true,
        name: true,
        upvotes: true,
        downvotes: true,
      },
    });
    if (!streamers) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return streamers;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const streamer = await ctx.prisma.streamer.findUnique({
        where: { id: input.id },
      });

      if (!streamer) throw new TRPCError({ code: "NOT_FOUND" });
      return streamer;
    }),
  upvoteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const streamer = await ctx.prisma.streamer.findUnique({
        where: { id: input.id },
      });

      if (!streamer) throw new TRPCError({ code: "NOT_FOUND" });
      const updatedStreamer = await ctx.prisma.streamer.update({
        where: {
          id: input.id,
        },
        data: {
          upvotes: { increment: 1 },
        },
      });
      ee.emit("upvote", updatedStreamer);
      return streamer;
    }),
  downvoteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const streamer = await ctx.prisma.streamer.findUnique({
        where: { id: input.id },
      });

      if (!streamer) throw new TRPCError({ code: "NOT_FOUND" });
      const updatedStreamer = await ctx.prisma.streamer.update({
        where: {
          id: input.id,
        },
        data: {
          downvotes: { increment: 1 },
        },
      });
      ee.emit("upvote", updatedStreamer);
      return streamer;
    }),
  onVotesUpdate: publicProcedure.subscription(() => {
    return observable<Streamer>((emit) => {
      const onVotesUpdate = (data: Streamer) => {
        emit.next(data);
      };
      ee.on("upvote", onVotesUpdate);
      ee.on("downvote", onVotesUpdate);
      return () => {
        ee.off("upvote", onVotesUpdate);
        ee.off("downvote", onVotesUpdate);
      };
    });
  }),
});
