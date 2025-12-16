export function BornForThis() {
  return (
    <section className="min-h-screen bg-linear-to-t from-red-950 to-[#000000] flex items-center justify-center">
      <div className="wfull relative flex flex-col items-center justify-center">
        <img
          src="./born-for-this-image.webp"
          alt="Born For This"
          className="w-10/12 md:w-6/12 mb-8"
        />
        <p className="absolute bg-linear-to-r from-indigo-900 via-red-500 to-amber-400 bg-clip-text text-transparent text-2xl md:text-5xl font-black">
          BORN FOR THIS
        </p>
      </div>
    </section>
  );
}
