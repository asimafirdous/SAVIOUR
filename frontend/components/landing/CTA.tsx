import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-indigo-600 py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">

        <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
          Never let the door close on you.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
          Stay organized, discover opportunities, and let SAVIOUR help you
          take the right step at the right time.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/login"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-indigo-600 transition hover:bg-slate-100"
          >
            Get Started with SAVIOUR
          </Link>
        </div>

      </div>
    </section>
  );
}