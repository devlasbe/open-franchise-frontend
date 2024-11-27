export default function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="z-10 fixed top-16 left-0 flex justify-center items-center w-full h-12 px-4 sm:px-16 bg-white bg-opacity-50 backdrop-blur-sm border-t shadow-md">
      {children}
    </div>
  );
}
