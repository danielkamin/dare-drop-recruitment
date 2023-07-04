import { type Streamer } from "@prisma/client";

export interface StreamerEvents {
  create: (data: Streamer) => void;
  upvote: (data: Streamer) => void;
  downvote: (data: Streamer) => void;
}
