import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "og.png");

// 1200x630 is the standard OG image size
const width = 1200;
const height = 630;

// Ship logo paths from ShipLogo.tsx, scaled and repositioned for OG
const shipSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgb(12,14,20)" />
      <stop offset="100%" stop-color="rgb(16,18,24)" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(164,52,62,0.08)" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
    <linearGradient id="divider" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="transparent" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.2)" />
      <stop offset="100%" stop-color="transparent" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#glow)" />

  <!-- Grape cluster - subtle background, bottom right -->
  <g transform="translate(920, 300)" opacity="0.05">
    <path d="M140 10 Q120 40 130 70 Q140 100 135 130" stroke="#A4343E" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M155 50 Q175 30 165 15 Q155 30 140 40 Q150 45 155 50Z" fill="#A4343E" stroke="#A4343E" stroke-width="1" />
    ${[
      [140, 140], [120, 150], [160, 150],
      [105, 170], [135, 170], [165, 170], [195, 160],
      [95, 195], [120, 190], [150, 190], [180, 190],
      [108, 215], [138, 210], [168, 210],
      [125, 235], [155, 230],
      [140, 255],
    ]
      .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="18" fill="#A4343E" fill-opacity="0.3" stroke="#A4343E" stroke-width="1.5" />`)
      .join("\n    ")}
  </g>

  <!-- Ship silhouette - centered, large -->
  <g transform="translate(460, 50) scale(0.7)" opacity="0.3">
    <!-- Main mast -->
    <line x1="200" y1="30" x2="200" y2="260" stroke="white" stroke-width="3" stroke-linecap="round" />
    <!-- Crow's nest -->
    <ellipse cx="200" cy="32" rx="6" ry="3" stroke="white" stroke-width="2" fill="none" />
    <!-- Fore mast -->
    <line x1="130" y1="60" x2="130" y2="240" stroke="white" stroke-width="2.5" stroke-linecap="round" />
    <!-- Mizzen mast -->
    <line x1="280" y1="80" x2="280" y2="240" stroke="white" stroke-width="2.5" stroke-linecap="round" />
    <!-- Bowsprit -->
    <line x1="70" y1="200" x2="130" y2="240" stroke="white" stroke-width="2.5" stroke-linecap="round" />
    <!-- Main sail -->
    <path d="M140 70 Q200 60 200 70 L200 170 Q200 180 140 170 Z" fill="white" fill-opacity="0.1" stroke="white" stroke-width="1.5" />
    <!-- Main topsail -->
    <path d="M150 40 Q200 30 200 40 L200 75 Q200 85 150 75 Z" fill="white" fill-opacity="0.08" stroke="white" stroke-width="1.5" />
    <!-- Fore sail -->
    <path d="M80 90 Q130 80 130 90 L130 170 Q130 180 80 170 Z" fill="white" fill-opacity="0.09" stroke="white" stroke-width="1.5" />
    <!-- Fore topsail -->
    <path d="M88 65 Q130 55 130 65 L130 95 Q130 105 88 95 Z" fill="white" fill-opacity="0.07" stroke="white" stroke-width="1.5" />
    <!-- Jib -->
    <path d="M70 200 L130 65 L130 200 Z" fill="white" fill-opacity="0.08" stroke="white" stroke-width="1.5" />
    <!-- Mizzen sail -->
    <path d="M210 90 Q270 80 280 90 L280 175 Q280 185 210 175 Z" fill="white" fill-opacity="0.09" stroke="white" stroke-width="1.5" />
    <!-- Mizzen topsail -->
    <path d="M220 75 Q270 65 280 75 L280 95 Q280 105 220 95 Z" fill="white" fill-opacity="0.07" stroke="white" stroke-width="1.5" />
    <!-- Spanker -->
    <path d="M280 90 L330 180 L280 220 Z" fill="white" fill-opacity="0.08" stroke="white" stroke-width="1.5" />
    <!-- Rigging -->
    <line x1="200" y1="50" x2="160" y2="240" stroke="white" stroke-width="0.7" stroke-opacity="0.4" />
    <line x1="200" y1="50" x2="240" y2="240" stroke="white" stroke-width="0.7" stroke-opacity="0.4" />
    <line x1="130" y1="65" x2="200" y2="45" stroke="white" stroke-width="0.7" stroke-opacity="0.35" />
    <line x1="200" y1="45" x2="280" y2="82" stroke="white" stroke-width="0.7" stroke-opacity="0.35" />
    <!-- Yard arms -->
    <line x1="135" y1="70" x2="205" y2="70" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <line x1="75" y1="90" x2="135" y2="90" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <line x1="205" y1="90" x2="285" y2="90" stroke="white" stroke-width="1.5" stroke-linecap="round" />
    <!-- Hull -->
    <path d="M75 240 Q80 235 90 235 L310 235 Q320 235 325 240 L310 270 Q280 285 200 285 Q120 285 90 270 Z" fill="white" fill-opacity="0.12" stroke="white" stroke-width="2" />
    <path d="M85 237 L315 237" stroke="white" stroke-width="1.5" stroke-opacity="0.6" />
    <!-- Bow -->
    <path d="M85 237 Q75 238 68 245 Q65 250 60 248" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <!-- Pennant -->
    <path d="M200 30 L200 18 L220 22 L200 26" fill="white" fill-opacity="0.3" stroke="white" stroke-width="1" />
    <!-- Waves -->
    <path d="M30 295 Q60 285 90 295 Q120 305 150 295 Q180 285 210 295 Q240 305 270 295 Q300 285 330 295 Q360 305 390 295" stroke="white" stroke-width="1.5" stroke-opacity="0.3" fill="none" />
    <path d="M20 310 Q55 300 90 310 Q125 320 160 310 Q195 300 230 310 Q265 320 300 310 Q335 300 370 310" stroke="white" stroke-width="1" stroke-opacity="0.2" fill="none" />
  </g>

  <!-- Title: ShipCru -->
  <text x="600" y="500" font-family="Georgia, 'Times New Roman', serif" font-size="130" font-weight="bold" letter-spacing="-2" text-anchor="middle">
    <tspan fill="white">Ship</tspan><tspan fill="#A4343E">Cru</tspan>
  </text>

  <!-- Bottom accent line -->
  <rect x="0" y="624" width="${width}" height="6" fill="#A4343E" opacity="0.6" />
</svg>
`;

await sharp(Buffer.from(shipSvg)).png({ quality: 90 }).toFile(outPath);
console.log(`OG image generated: ${outPath}`);
