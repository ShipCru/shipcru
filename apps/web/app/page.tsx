import { ShipLogo } from "./components/ShipLogo";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Layered gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(99, 91, 255, 0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 100%, rgba(30, 27, 75, 0.4) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Top fade for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-medium text-gray-300">
            Coming Soon
          </span>
        </div>

        {/* Ship Logo */}
        <div className="mx-auto mb-10 w-48 sm:w-56 md:w-64">
          <div
            className="text-white/80"
            style={{ animation: "shipFloat 6s ease-in-out infinite" }}
          >
            <ShipLogo />
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-display-2xl font-bold tracking-tight text-white">
          Ship
          <span className="text-violet-400">Cru</span>
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-5 max-w-xl text-xl leading-relaxed text-gray-400">
          Ship code with your cru.
        </p>

        {/* Subtle divider */}
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Sub-tagline */}
        <p className="mt-6 text-sm text-gray-500">
          Development tools for teams that ship fast.
        </p>

        {/* Etymology */}
        <div className="mt-16 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-start gap-8 sm:gap-0">
            {/* Ship */}
            <div className="sm:pr-10 sm:text-right text-center">
              <div className="flex items-baseline justify-center sm:justify-end gap-2.5">
                <span className="text-xl font-semibold text-white tracking-tight">
                  ship
                </span>
                <span className="text-xs italic text-gray-600">/SHip/</span>
              </div>
              <ol className="mt-3.5 space-y-1.5 list-none p-0">
                <li className="text-sm text-gray-500">
                  <span className="text-gray-600 tabular-nums">1.</span>{" "}
                  to deploy code to production
                </li>
                <li className="text-sm text-gray-500">
                  <span className="text-gray-600 tabular-nums">2.</span>{" "}
                  to send a product into the world
                </li>
                <li className="text-sm text-gray-500">
                  <span className="text-gray-600 tabular-nums">3.</span>{" "}
                  a vessel on the open sea
                </li>
              </ol>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-transparent via-white/15 to-transparent" />

            {/* Mobile divider */}
            <div className="sm:hidden mx-auto h-px w-16 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Cru */}
            <div className="sm:pl-10 sm:text-left text-center">
              <div className="flex items-baseline justify-center sm:justify-start gap-2.5">
                <span className="text-xl font-semibold text-violet-400 tracking-tight">
                  cru
                </span>
                <span className="text-xs italic text-gray-600">
                  /kro&#x342;o/
                </span>
              </div>
              <ol className="mt-3.5 space-y-1.5 list-none p-0">
                <li className="text-sm text-gray-500">
                  <span className="text-gray-600 tabular-nums">1.</span>{" "}
                  a vineyard&thinsp;&mdash;&thinsp;
                  <em className="not-italic text-gray-400">Grand Cru</em>
                </li>
                <li className="text-sm text-gray-500">
                  <span className="text-gray-600 tabular-nums">2.</span>{" "}
                  your crew, who you build with
                </li>
                <li className="text-sm text-gray-500">
                  <span className="text-gray-600 tabular-nums">3.</span>{" "}
                  <em className="not-italic text-gray-400">French:</em> raw,
                  unfiltered
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient for grounding */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />
    </main>
  );
}
