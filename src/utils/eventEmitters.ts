import { EventEmitter } from "events";
import { type StreamerEvents } from "~/@types/interfaces";

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

export { StreamersEventEmitter };
