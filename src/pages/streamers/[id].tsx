import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";

import { LoadingPage } from "~/components/common/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const Streamer: NextPage<{ id: string }> = ({ id }) => {
  const { data, status, isLoading } = api.streamers.getById.useQuery({ id });

  if (status !== "success" || isLoading) {
    return <LoadingPage />;
  }
  if (!data) {
    return (
      <h1 className="text-3xl font-bold text-white">
        Error occured while fetching streamers data!
      </h1>
    );
  }
  return (
    <div className="card mx-auto w-fit bg-base-100 shadow-xl">
      <div className="flex gap-10 p-4 ">
        <div>
          <Image
            src="/example.png"
            width={300}
            height={300}
            alt="Streamers PFP"
            className="rounded-full"
          />
        </div>

        <div className="flex w-96 flex-col gap-4">
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <h2 className="text-2xl font-semibold">{data.streamingPlatform}</h2>
          <div className="">
            <p>Upvotes: {data.upvotes}</p>
            <p>Downvotes: {data.downvotes}</p>
          </div>
          <div>
            <p className="italic">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");
  await ssg.streamers.getById.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};
export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
export default Streamer;
