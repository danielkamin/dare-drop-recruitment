import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="mockup-window border bg-base-300">
        <div className="flex flex-col items-center justify-center bg-base-200 px-4 py-16">
          <h1 className="text-3xl font-bold">Dare Drop Recruitment</h1>
          <p className="my-4">
            This is a simple streamer spotlight application
          </p>
          <Link className="underline" href="/streamers">
            Go to streamers page
          </Link>
        </div>
      </div>
    </>
  );
}
