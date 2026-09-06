// Static, non-WebGL / reduced-motion fallback with the same
// compositional idea: a strand branching upward, differentiating from
// leaf-green (structural) to water-blue (live data) past a threshold.
export function GrowthFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 400 500"
        className="h-full max-h-[24rem] w-auto max-w-full"
        role="img"
        aria-label="A branching structure differentiating from root to routed data, illustrating Procambrian's growth model"
      >
        <g fill="none" strokeLinecap="round">
          <path d="M200 480 L200 340" stroke="#3f8443" strokeWidth="10" />
          <path d="M200 340 L150 260 M200 340 L250 255" stroke="#3f8443" strokeWidth="7" />
          <path d="M150 260 L110 190 M150 260 L165 175" stroke="#3f8443" strokeWidth="5" />
          <path d="M250 255 L290 180 M250 255 L235 170" stroke="#1e6fa8" strokeWidth="5" />
          <path d="M110 190 L85 130 M110 190 L125 120" stroke="#77877d" strokeWidth="3" />
          <path d="M290 180 L315 115 M290 180 L270 110" stroke="#1e6fa8" strokeWidth="3" />
          <path d="M235 170 L225 100 M235 170 L255 100" stroke="#1e6fa8" strokeWidth="3" />
          <circle cx="315" cy="115" r="4" fill="#1e6fa8" />
          <circle cx="270" cy="110" r="4" fill="#1e6fa8" />
          <circle cx="225" cy="100" r="4" fill="#1e6fa8" />
          <circle cx="255" cy="100" r="4" fill="#1e6fa8" />
          <circle cx="85" cy="130" r="3" fill="#77877d" />
          <circle cx="125" cy="120" r="3" fill="#77877d" />
        </g>
      </svg>
    </div>
  );
}
