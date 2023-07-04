/* eslint-disable @typescript-eslint/no-misused-promises */
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IStreamer, streamerSchema } from "~/server/validation/streamer";
import { streamingPlatforms } from "~/utils/constants";

interface IStreamerForm {
  onSubmit: SubmitHandler<IStreamer>;
}
export const NewStreamerForm = ({ onSubmit }: IStreamerForm) => {
  const { register, handleSubmit } = useForm<IStreamer>({
    resolver: zodResolver(streamerSchema),
  });
  return (
    <form
      className="flex items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add New Streamer</h2>
          <input
            type="text"
            placeholder="enter name..."
            className="input-bordered input my-2 w-full max-w-xs"
            {...register("name")}
          />
          <textarea
            rows={6}
            placeholder="enter description..."
            className="textarea-bordered textarea my-2 w-full max-w-xs"
            {...register("description")}
          />
          <select
            className="select-bordered select w-full max-w-xs"
            {...register("streamingPlatform")}
            defaultValue={"Twitch"}
          >
            {streamingPlatforms.map((platform) => (
              <option key={platform}>{platform}</option>
            ))}
          </select>
          <div className="card-actions items-center justify-between">
            <button className="btn-secondary btn" type="submit">
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
