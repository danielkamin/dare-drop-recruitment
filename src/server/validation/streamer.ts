import * as z from "zod";
import { streamingPlatforms } from "~/utils/constants";

export const streamerSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(255),
  streamingPlatform: z.enum(streamingPlatforms),
});

export type IStreamer = z.infer<typeof streamerSchema>;
