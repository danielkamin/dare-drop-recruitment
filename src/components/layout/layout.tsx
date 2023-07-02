import Head from "next/head";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Head>
        <title>Dare Drop Recruitment</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
};

export default Layout;
