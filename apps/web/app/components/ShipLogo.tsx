export function ShipLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main mast */}
      <line
        x1="200"
        y1="30"
        x2="200"
        y2="260"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Crow's nest */}
      <ellipse
        cx="200"
        cy="32"
        rx="6"
        ry="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Fore mast */}
      <line
        x1="130"
        y1="60"
        x2="130"
        y2="240"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Mizzen mast */}
      <line
        x1="280"
        y1="80"
        x2="280"
        y2="240"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Bowsprit */}
      <line
        x1="70"
        y1="200"
        x2="130"
        y2="240"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* === SAILS === */}

      {/* Main sail (large, center) */}
      <path
        d="M140 70 Q200 60 200 70 L200 170 Q200 180 140 170 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Main topsail */}
      <path
        d="M150 40 Q200 30 200 40 L200 75 Q200 85 150 75 Z"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Fore sail */}
      <path
        d="M80 90 Q130 80 130 90 L130 170 Q130 180 80 170 Z"
        fill="currentColor"
        fillOpacity="0.07"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Fore topsail */}
      <path
        d="M88 65 Q130 55 130 65 L130 95 Q130 105 88 95 Z"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Mizzen sail */}
      <path
        d="M210 90 Q270 80 280 90 L280 175 Q280 185 210 175 Z"
        fill="currentColor"
        fillOpacity="0.07"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Mizzen topsail */}
      <path
        d="M220 75 Q270 65 280 75 L280 95 Q280 105 220 95 Z"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Jib sail (front triangle) */}
      <path
        d="M70 200 L130 65 L130 200 Z"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Spanker sail (rear triangle) */}
      <path
        d="M280 90 L330 180 L280 220 Z"
        fill="currentColor"
        fillOpacity="0.06"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* === RIGGING === */}

      {/* Shrouds - main mast */}
      <line x1="200" y1="50" x2="160" y2="240" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4" />
      <line x1="200" y1="50" x2="240" y2="240" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4" />
      {/* Shrouds - fore mast */}
      <line x1="130" y1="65" x2="105" y2="240" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4" />
      {/* Shrouds - mizzen */}
      <line x1="280" y1="85" x2="305" y2="240" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.4" />

      {/* Stays (horizontal rigging between masts) */}
      <line x1="130" y1="65" x2="200" y2="45" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.35" />
      <line x1="200" y1="45" x2="280" y2="82" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.35" />

      {/* Yard arms */}
      <line x1="135" y1="70" x2="205" y2="70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="145" y1="40" x2="205" y2="40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="75" y1="90" x2="135" y2="90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="83" y1="65" x2="135" y2="65" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="205" y1="90" x2="285" y2="90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="215" y1="75" x2="285" y2="75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      {/* Ratlines (rope ladder on shrouds) */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 120 + i * 20;
        const xL = 160 + ((y - 50) / 190) * (200 - 160);
        const xR = 240 - ((y - 50) / 190) * (240 - 200);
        return (
          <line
            key={`ratline-${i}`}
            x1={200 - (200 - xL)}
            y1={y}
            x2={200 + (xR - 200)}
            y2={y}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        );
      })}

      {/* === HULL === */}

      {/* Main hull body */}
      <path
        d="M75 240 Q80 235 90 235 L310 235 Q320 235 325 240 L310 270 Q280 285 200 285 Q120 285 90 270 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Hull upper rail/gunwale */}
      <path
        d="M85 237 L315 237"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />

      {/* Hull planking lines */}
      <path
        d="M95 250 Q200 248 305 250"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
      />
      <path
        d="M100 260 Q200 258 300 260"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
      />
      <path
        d="M110 270 Q200 268 290 270"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
      />

      {/* Stern detail */}
      <path
        d="M310 237 Q325 237 325 240 L315 265"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Stern windows */}
      <rect x="300" y="245" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />
      <rect x="290" y="245" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />

      {/* Bow detail - figurehead area */}
      <path
        d="M85 237 Q75 238 68 245 Q65 250 60 248"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Port holes */}
      <circle cx="140" cy="252" r="3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />
      <circle cx="170" cy="252" r="3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />
      <circle cx="200" cy="252" r="3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />
      <circle cx="230" cy="252" r="3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />
      <circle cx="260" cy="252" r="3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.06" />

      {/* === PENNANT / FLAG === */}
      <path
        d="M200 30 L200 18 L220 22 L200 26"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* === WAVES === */}
      <path
        d="M30 295 Q60 285 90 295 Q120 305 150 295 Q180 285 210 295 Q240 305 270 295 Q300 285 330 295 Q360 305 390 295"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d="M20 310 Q55 300 90 310 Q125 320 160 310 Q195 300 230 310 Q265 320 300 310 Q335 300 370 310"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
        fill="none"
      />
      <path
        d="M40 322 Q70 315 100 322 Q130 329 160 322 Q190 315 220 322 Q250 329 280 322 Q310 315 340 322 Q370 329 400 322"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.12"
        fill="none"
      />
    </svg>
  );
}
