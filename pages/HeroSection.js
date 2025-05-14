export default function HeroSection() {
  return (
    <div className=" bg-gray-100 text-gray-900 p-10 md:p-20">
    <div className="flex flex-col  md:flex-row justify-center items-center text-center">
      <section className="flex flex-col justify-center items-center text-center">
        <div>
          <h1 className="text-5xl font-bold text-blue-600">Hi, I'm Abhijeet</h1>
          {/* Apply max-w to the paragraph */}
          <p className="text-xl mt-4 max-w-[calc(theme(fontSize.5xl)[0])]">
            I'm a web developer. Welcome to my portfolio!
          </p>
        </div>
        <a
          href="https://github.com/Acinnamon9"
          className="mt-6 text-lg text-blue-500 hover:underline"
        >
          Check out my GitHub
        </a>
      </section>

      <img
        src="/images/personal/abhijeet.jpg"
        alt="Abhijeet"
        className="rounded-full w-32 h-auto mt-10 md:mt-0 md:ml-20 "
      />
    </div>
    </div>
  );
}