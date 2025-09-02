// lib/svg.ts

/**
 * Genereert een deterministische Apple/Glass-achtige SVG en geeft een data:URI terug.
 * Compatibel met Node (Buffer) en browser/edge (btoa), met correcte UTF-8 base64.
 */

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Eenvoudige, deterministische hash voor kleur/variatie */
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

function hsl(h: number, s: number, l: number): string {
  return `hsl(${Math.round(h)},${Math.round(s)}%,${Math.round(l)}%)`;
}

/** Veilige base64 helper met UTF-8 support, werkt in Node en browser/edge runtimes */
function toBase64Utf8(input: string): string {
  // Node / V8 (server)
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf8").toString("base64");
  }

  // Browser / Edge runtimes
  const g = globalThis as unknown as Partial<WindowOrWorkerGlobalScope>;
  if (g && typeof g.btoa === "function") {
    // btoa verwacht binary string; converteer UTF-8 correct
    if (typeof TextEncoder !== "undefined") {
      const bytes = new TextEncoder().encode(input);
      let bin = "";
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      return g.btoa(bin);
    }
    // Last resort (ASCII only)
    return g.btoa(input);
  }

  // Fallback (uitzonderlijk)
  throw new Error("Base64 encoding not supported in this runtime");
}

export function keywordSvgDataUri(
  text: string,
  opts?: { width?: number; height?: number }
): string {
  const width = opts?.width ?? 1200;
  const height = opts?.height ?? 630;

  const escaped = escapeXml(text);
  const seed = hashStr(text);

  // Kleuren op basis van hash (consistent per tekst)
  const h1 = (seed % 360 + 360) % 360;
  const h2 = (h1 + 60 + ((seed >> 3) % 90)) % 360;
  const h3 = (h1 + 200 + ((seed >> 5) % 60)) % 360;

  const bgA = hsl(h1, 70, 62);
  const bgB = hsl(h2, 70, 74);
  const accent = hsl(h3, 68, 55);

  // Blob-posities/afmetingen variëren deterministisch mee (percent → pixels)
  const b1x = 20 + (seed % 30);            // 20–49
  const b1y = 10 + ((seed >> 4) % 25);     // 10–34
  const b1r = 36 + ((seed >> 8) % 20);     // 36–55

  const b2x = 60 + ((seed >> 6) % 25);     // 60–84
  const b2y = 18 + ((seed >> 10) % 28);    // 18–45
  const b2r = 28 + ((seed >> 12) % 18);    // 28–45

  const b3x = 40 + ((seed >> 14) % 35);    // 40–74
  const b3y = 60 + ((seed >> 16) % 30);    // 60–89
  const b3r = 22 + ((seed >> 20) % 18);    // 22–39

  // IDs per seed zodat gradients/filters uniek zijn
  const id = (name: string) => `${name}-${seed.toString(36)}`;

  // Afgeleide maten voor tekst zonder calc() in SVG attributes
  const minSide = Math.min(width, height);
  const titleFontSize = minSide * 0.07;
  const subtitleFontSize = minSide * 0.028;
  const subtitleYOffset = minSide * 0.065;
  const subtitleY = height * 0.5 + subtitleYOffset;

  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' role='img'>
  <defs>
    <!-- Zachte achtergrondgradient -->
    <linearGradient id='${id("bg")}' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${bgA}'/>
      <stop offset='100%' stop-color='${bgB}'/>
    </linearGradient>

    <!-- Accent gradient (voor text & rand) -->
    <linearGradient id='${id("accent")}' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${accent}'/>
      <stop offset='100%' stop-color='${hsl(h2, 80, 50)}'/>
    </linearGradient>

    <!-- Glas effect (lichte blur) -->
    <filter id='${id("glass")}' x='-20%' y='-20%' width='140%' height='140%'>
      <feGaussianBlur in='SourceGraphic' stdDeviation='0.6' result='blur'/>
      <feComposite in='SourceGraphic' in2='blur' operator='over'/>
    </filter>

    <!-- Heel subtiele ruis -->
    <filter id='${id("noise")}' x='0' y='0' width='100%' height='100%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch' result='turb'/>
      <feColorMatrix type='saturate' values='0' in='turb' result='mono'/>
      <feComponentTransfer>
        <feFuncA type='table' tableValues='0 0 0 0 .04 .05 .04 0 0 0'/>
      </feComponentTransfer>
    </filter>

    <!-- Radiale blobs -->
    <radialGradient id='${id("blob1")}' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='${hsl(h1, 80, 55)}' stop-opacity='0.55'/>
      <stop offset='100%' stop-color='${hsl(h1, 80, 55)}' stop-opacity='0'/>
    </radialGradient>
    <radialGradient id='${id("blob2")}' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='${hsl(h2, 80, 60)}' stop-opacity='0.45'/>
      <stop offset='100%' stop-color='${hsl(h2, 80, 60)}' stop-opacity='0'/>
    </radialGradient>
    <radialGradient id='${id("blob3")}' cx='50%' cy='50%' r='50%'>
      <stop offset='0%' stop-color='${hsl(h3, 80, 58)}' stop-opacity='0.40'/>
      <stop offset='100%' stop-color='${hsl(h3, 80, 58)}' stop-opacity='0'/>
    </radialGradient>
  </defs>

  <!-- Achtergrond -->
  <rect width='100%' height='100%' fill='url(#${id("bg")})'/>

  <!-- Organische blobs -->
  <circle cx='${(b1x / 100) * width}' cy='${((b1y / 100) * height)}' r='${(b1r / 100) * width}' fill='url(#${id("blob1")})'/>
  <circle cx='${(b2x / 100) * width}' cy='${((b2y / 100) * height)}' r='${(b2r / 100) * width}' fill='url(#${id("blob2")})'/>
  <circle cx='${(b3x / 100) * width}' cy='${((b3y / 100) * height)}' r='${(b3r / 100) * width}' fill='url(#${id("blob3")})'/>

  <!-- Glazen kaart -->
  <g filter='url(#${id("glass")})'>
    <rect x='${width * 0.08}' y='${height * 0.28}' rx='28'
          width='${width * 0.84}' height='${height * 0.44}'
          fill='rgba(255,255,255,0.14)' stroke='url(#${id("accent")})' stroke-opacity='.55'/>
    <!-- Schijnrand -->
    <rect x='${width * 0.08 + 1.5}' y='${height * 0.28 + 1.5}' rx='26.5'
          width='${width * 0.84 - 3}' height='${height * 0.44 - 3}'
          fill='none' stroke='rgba(255,255,255,.35)'/>
  </g>

  <!-- Titeltekst -->
  <g>
    <text x='50%' y='${height * 0.5}' dominant-baseline='middle' text-anchor='middle'
          font-family='ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial'
          font-weight='800' font-size='${titleFontSize}'
          fill='url(#${id("accent")})' letter-spacing='.3px'>
      ${escaped}
    </text>
    <text x='50%' y='${subtitleY}'
          text-anchor='middle' font-size='${subtitleFontSize}'
          font-family='ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial'
          fill='rgba(17,24,39,.72)'>
      X3DPrints — Precisie 3D print service
    </text>
  </g>

  <!-- Subtiele ruis bovenop alles -->
  <rect width='100%' height='100%' filter='url(#${id("noise")})' opacity='.35'/>
</svg>`.trim();

  // Data URI
  const base64 = toBase64Utf8(svg);
  return `data:image/svg+xml;base64,${base64}`;
}
