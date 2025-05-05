

import Link from "next/link";

const NotFound = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen !text-white">
     <h1 className="font-bold text-2xl mb-2 text-red-500">404</h1>
        <p> Path Not Found</p>
        <Link
          href={"/paths"}
          className="!mt-4 !px-3 !py-1 !bg-red-500 !text-white !rounded"
          replace
        >
          Return To Paths
        </Link>
    </div>
  );
};

export default NotFound;
