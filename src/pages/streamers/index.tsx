import { type NextPage } from "next";
import { useRouter } from "next/router";
import { type SubmitHandler } from "react-hook-form";
import { LoadingPage } from "~/components/common/loading";
import { StreamersTable } from "~/components/common/streamersTable";
import { NewStreamerForm } from "~/components/forms/newStreamerForm";
import { type IStreamer } from "~/server/validation/streamer";
import { api } from "~/utils/api";

const Streamers: NextPage = () => {
  const { push } = useRouter();
  const { mutateAsync: addStreamer } = api.streamers.create.useMutation();
  const { mutate: upvote } = api.streamers.upvoteById.useMutation();
  const { mutate: downvote } = api.streamers.downvoteById.useMutation();
  const {
    data: streamers,
    isLoading: isStreamersDataLoading,
    refetch,
  } = api.streamers.getAll.useQuery();
  api.streamers.onCreate.useSubscription(undefined, {
    onData() {
      void refetch();
    },
    onError(err) {
      console.error("Subscription error:", err);
    },
  });
  api.streamers.onVotesUpdate.useSubscription(undefined, {
    onData() {
      void refetch();
    },
    onError(err) {
      console.error("Subscription error:", err);
    },
  });
  const onSubmit: SubmitHandler<IStreamer> = async (data) => {
    const newStreamer = await addStreamer(data);
    if (newStreamer) await push(`/streamers/${newStreamer.id}`);
  };

  if (isStreamersDataLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex items-center justify-around ">
      <NewStreamerForm onSubmit={onSubmit}></NewStreamerForm>
      <div className="card overflow-x-auto bg-base-100 p-4 shadow-xl">
        {streamers ? (
          <StreamersTable
            data={streamers}
            upvoteHandler={upvote}
            downvoteHandler={downvote}
          />
        ) : (
          <h2 className="text-2xl font-semibold">Error while fetching data!</h2>
        )}
      </div>
    </div>
  );
};
export default Streamers;
