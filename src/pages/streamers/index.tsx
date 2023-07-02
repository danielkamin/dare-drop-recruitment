import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { type SubmitHandler } from "react-hook-form";
import { LoadingPage } from "~/components/common/loading";
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
        <table className="table text-white">
          <thead className="font-semibold text-white">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Upvotes</th>
              <th>Downvotes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {streamers?.length === 0 ? (
              <p className="text-bold py-4 ">No data...</p>
            ) : (
              streamers?.map((s, index) => (
                <tr key={s.id} className="hover">
                  <th>{index + 1}</th>
                  <td>{s.name}</td>
                  <td>{s.upvotes}</td>
                  <td>{s.downvotes}</td>
                  <td>
                    <div className="flex gap-1">
                      <button
                        className="btn-primary btn-sm btn cursor-pointer"
                        onClick={() => upvote({ id: s.id })}
                      >
                        Upvote
                      </button>
                      <button
                        className="btn-secondary btn-sm btn cursor-pointer"
                        onClick={() => downvote({ id: s.id })}
                      >
                        Downvote
                      </button>
                      <Link className="" key={s.id} href={`/streamers/${s.id}`}>
                        <button className="btn-link btn-sm btn cursor-pointer">
                          Visit page
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Streamers;
