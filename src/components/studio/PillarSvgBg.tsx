interface SvgBgProps {
  setRef?: (el: SVGSVGElement | null) => void;
  className?: string;
}

/** High-End Web: single calligraphic bezier curve - precision as a brushstroke */
export function CurveSVG({ setRef, className }: SvgBgProps) {
  return (
    <svg
      ref={setRef}
      viewBox="0 0 400 600"
      fill="none"
      className={className ?? 'absolute inset-0 w-full h-full'}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M 40 580 C 360 440, 30 320, 370 160 S 60 60, 380 20"
        stroke="rgba(220,38,38,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Tech Engines: node-and-line network - a system assembling itself */
export function NodesSVG({ setRef, className }: SvgBgProps) {
  const nodes = [
    { cx: 80,  cy: 110 },
    { cx: 300, cy: 85  },
    { cx: 160, cy: 275 },
    { cx: 320, cy: 295 },
    { cx: 200, cy: 455 },
    { cx: 55,  cy: 435 },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [2, 4], [0, 2], [1, 3],
  ];

  return (
    <svg
      ref={setRef}
      viewBox="0 0 400 560"
      fill="none"
      className={className ?? 'absolute inset-0 w-full h-full'}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(220,38,38,0.15)"
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={`n${i}`}
          cx={n.cx}
          cy={n.cy}
          r="4"
          fill="rgba(220,38,38,0.28)"
        />
      ))}
    </svg>
  );
}

/** Strategic Alignment: lines converging to vanishing point - many inputs, one outcome */
export function VanishingSVG({ setRef, className }: SvgBgProps) {
  const VP = { x: 375, y: 28 };
  const origins = [
    { x: 0,   y: 600 },
    { x: 110, y: 600 },
    { x: 230, y: 600 },
    { x: 0,   y: 390 },
    { x: 0,   y: 240 },
    { x: 0,   y: 130 },
  ];

  return (
    <svg
      ref={setRef}
      viewBox="0 0 400 600"
      fill="none"
      className={className ?? 'absolute inset-0 w-full h-full'}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {origins.map((o, i) => (
        <line
          key={`v${i}`}
          x1={o.x} y1={o.y}
          x2={VP.x} y2={VP.y}
          stroke="rgba(220,38,38,0.15)"
          strokeWidth="1"
        />
      ))}
      <circle cx={VP.x} cy={VP.y} r="3.5" fill="rgba(220,38,38,0.45)" />
    </svg>
  );
}

export const SVG_COMPONENTS = [CurveSVG, NodesSVG, VanishingSVG] as const;
