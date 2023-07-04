import { type RouterOutputs } from "~/utils/api";
import Link from "next/link";

interface IStreamersTable {
  data: RouterOutputs["streamers"]["getAll"];
  upvoteHandler: (variables: { id: string }) => void;
  downvoteHandler: (variables: { id: string }) => void;
}
export const StreamersTable = ({
  data,
  upvoteHandler,
  downvoteHandler,
}: IStreamersTable) => {
  return (
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
        {data?.length === 0 ? (
          <p className="text-bold py-4 ">No data...</p>
        ) : (
          data?.map((s, index) => (
            <tr key={s.id} className="hover">
              <th>{index + 1}</th>
              <td>{s.name}</td>
              <td>{s.upvotes}</td>
              <td>{s.downvotes}</td>
              <td>
                <div className="flex gap-1">
                  <button
                    className="btn-primary btn-sm btn cursor-pointer"
                    onClick={() => upvoteHandler({ id: s.id })}
                  >
                    Upvote
                  </button>
                  <button
                    className="btn-secondary btn-sm btn cursor-pointer"
                    onClick={() => downvoteHandler({ id: s.id })}
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
  );
};
