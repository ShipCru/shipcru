import { ShipLogo } from "./components/ShipLogo";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:py-20">
      {/* Layered gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(164, 52, 62, 0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(140, 40, 50, 0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 100%, rgba(50, 20, 25, 0.35) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Grape cluster background — bottom right */}
      <svg
        className="pointer-events-none absolute bottom-16 right-8 sm:bottom-24 sm:right-16 md:right-24"
        width="280"
        height="320"
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.07 }}
      >
        {/* Vine stem */}
        <path
          d="M140 10 Q120 40 130 70 Q140 100 135 130"
          stroke="#A4343E"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tendril */}
        <path
          d="M130 35 Q110 25 100 35 Q90 45 95 55"
          stroke="#A4343E"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaf */}
        <path
          d="M155 50 Q175 30 165 15 Q155 30 140 40 Q150 45 155 50Z"
          fill="#A4343E"
          stroke="#A4343E"
          strokeWidth="1"
        />
        {/* Grape berries — cluster */}
        {[
          [140, 140], [120, 150], [160, 150],
          [105, 170], [135, 170], [165, 170], [195, 160],
          [95, 195], [120, 190], [150, 190], [180, 190],
          [108, 215], [138, 210], [168, 210],
          [125, 235], [155, 230],
          [140, 255],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="18"
            fill="#A4343E"
            fillOpacity="0.3"
            stroke="#A4343E"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Top fade for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Ship Logo — visible immediately */}
        <div className="mx-auto mb-6 w-48 sm:w-56 md:w-64">
          <div
            className="text-white/80"
            style={{ animation: "shipFloat 3s ease-in-out infinite" }}
          >
            <ShipLogo />
          </div>
        </div>

        {/* Hero group — fades in after 1s */}
        <div className="animate-fade-in-hero">
          {/* App Name */}
          <h1 className="font-display text-display-2xl font-bold tracking-tight text-white">
            Ship
            <span className="text-burgundy">Cru</span>
          </h1>

          {/* Subtle divider */}
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Tagline */}
          <p className="font-display mx-auto mt-5 max-w-2xl text-xl sm:text-2xl md:text-display-sm leading-relaxed text-gray-400">
            Where the <span className="text-burgundy">finest</span> crews <span className="text-white">ship</span> product and <span className="text-white">launch</span> careers of the highest <span className="text-burgundy">distinction</span>.
          </p>
        </div>

        {/* Etymology — fades in after 2s */}
        <div className="mt-10 animate-fade-in-definitions">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-start gap-8 sm:gap-0">
            {/* Ship */}
            <div className="sm:pr-12 text-left">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  ship
                </span>
                <span className="text-sm text-gray-600">/SHip/</span>
              </div>
              <p className="mt-1 text-sm italic text-gray-600">
                Old English <em>scip</em>, of Germanic origin
              </p>

              {/* noun */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm italic text-gray-600">noun</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <ol className="mt-2.5 list-none p-0">
                <li>
                  <p className="text-base sm:text-lg text-gray-300">
                    a vessel on the open sea.
                  </p>
                  <p className="mt-1 text-sm italic text-gray-600">
                    &ldquo;the ship set sail at dawn&rdquo;
                  </p>
                </li>
              </ol>

              {/* verb */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm italic text-gray-600">verb</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <ol className="mt-2.5 space-y-3 list-none p-0">
                <li>
                  <p className="text-base sm:text-lg text-gray-300">
                    to launch a career forward.
                  </p>
                  <p className="mt-1 text-sm italic text-gray-600">
                    &ldquo;she shipped her career to the next level&rdquo;
                  </p>
                </li>
                <li>
                  <p className="text-base sm:text-lg text-gray-300">
                    to deploy product to production.
                  </p>
                  <p className="mt-1 text-sm italic text-gray-600">
                    &ldquo;the crew shipped it to production before morning coffee&rdquo;
                  </p>
                </li>
              </ol>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-transparent via-white/15 to-transparent" />

            {/* Mobile divider */}
            <div className="sm:hidden mx-auto h-px w-16 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Cru */}
            <div className="sm:pl-12 text-left">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-gray-300 tracking-tight">
                  cru
                </span>
                <span className="text-sm text-gray-600">
                  /kro&#x342;o/
                </span>
              </div>
              <p className="mt-1 text-sm italic text-gray-600">
                French, from <em>cru</em> &lsquo;growth&rsquo;, past participle of <em>cro&icirc;tre</em>
              </p>

              {/* noun */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm italic text-gray-600">noun</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <ol className="mt-2.5 space-y-3 list-none p-0">
                <li>
                  <p className="text-base sm:text-lg text-gray-300">
                    a wine of the most superior grade, or the vineyard
                    that produces it.
                  </p>
                  <p className="mt-1 text-sm italic text-gray-600">
                    &ldquo;officially rated at grand cru status&rdquo;
                  </p>
                </li>
                <li>
                  <p className="text-base sm:text-lg text-gray-300">
                    a team of exceptional quality.
                  </p>
                  <p className="mt-1 text-sm italic text-gray-600">
                    &ldquo;a crew known for shipping without compromise&rdquo;
                  </p>
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
            "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
      />
    </main>
  );
}
