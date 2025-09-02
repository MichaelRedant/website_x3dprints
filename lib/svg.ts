function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function keywordSvgDataUri(text: string): string {
  const escaped = escapeXml(text);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect width='100%' height='100%' fill='#f8fafc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#1f2937' font-size='48' font-family='sans-serif'>${escaped}</text></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
