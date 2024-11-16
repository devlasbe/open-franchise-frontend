import Loading from "../ui/loading";

export default function SuspenseFallback() {
  return (
    <div className="relative flex flex-1 justify-center items-center w-full min-h-24 rounded-lg">
      <div className="z-50 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Loading />
      </div>
    </div>
  );
}
