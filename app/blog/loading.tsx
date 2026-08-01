export default function BlogLoading() {
  return (
    <section
      className="
        min-h-[75vh]
        px-4 py-20
        sm:px-6 lg:px-12
      "
      style={{
        paddingTop:
          "calc(var(--navbar-h, 5rem) + 5rem)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            h-4 w-36
            animate-pulse
            bg-foreground/10
          "
        />

        <div
          className="
            mt-6 h-16 max-w-3xl
            animate-pulse
            bg-foreground/10
          "
        />

        <div
          className="
            mt-14 space-y-8
          "
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                border-b
                border-foreground/10
                pb-10
              "
            >
              <div
                className="
                  h-4 w-48
                  animate-pulse
                  bg-foreground/10
                "
              />

              <div
                className="
                  mt-4 h-9 max-w-2xl
                  animate-pulse
                  bg-foreground/10
                "
              />

              <div
                className="
                  mt-5 h-20 max-w-3xl
                  animate-pulse
                  bg-foreground/10
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
