// Static, non-WebGL / reduced-motion fallback with the same
// compositional idea: a strand branching upward, differentiating
// from amber (structural) to oxide (live/data) past a threshold.
export function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 400 500"
        className="h-[70%] w-auto max-w-full opacity-90"
        role="img"
        aria-label="A branching structure differentiating from root to routed data, illustrating Procambrian's growth model"
      >
        <g fill="none" strokeLinecap="round">
          <path d="M200 480 L200 340" stroke="#4f9d52" strokeWidth="10" />
          <path d="M200 340 L150 260 M200 340 L250 255" stroke="#4f9d52" strokeWidth="7" />
          <path d="M150 260 L110 190 M150 260 L165 175" stroke="#4f9d52" strokeWidth="5" />
          <path d="M250 255 L290 180 M250 255 L235 170" stroke="#2c8fd6" strokeWidth="5" />
          <path d="M110 190 L85 130 M110 190 L125 120" stroke="#93a49a" strokeWidth="3" />
          <path d="M290 180 L315 115 M290 180 L270 110" stroke="#2c8fd6" strokeWidth="3" />
          <path d="M235 170 L225 100 M235 170 L255 100" stroke="#2c8fd6" strokeWidth="3" />
          <circle cx="315" cy="115" r="4" fill="#2c8fd6" />
          <circle cx="270" cy="110" r="4" fill="#2c8fd6" />
          <circle cx="225" cy="100" r="4" fill="#2c8fd6" />
          <circle cx="255" cy="100" r="4" fill="#2c8fd6" />
          <circle cx="85" cy="130" r="3" fill="#93a49a" />
          <circle cx="125" cy="120" r="3" fill="#93a49a" />
        </g>
      </svg>
    </div>
  );
}
