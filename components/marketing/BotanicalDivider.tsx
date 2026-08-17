export function BotanicalDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-2 ${className || ""}`} aria-hidden="true">
      <svg width="180" height="24" viewBox="0 0 180 24" fill="none">
        <path d="M2 12 C50 2, 70 22, 90 12 S130 2, 178 12" stroke="#9AA58D" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <g transform="translate(90 12)">
          <ellipse rx="5" ry="3" fill="#C9A39A" />
          <ellipse rx="5" ry="3" fill="#C9A39A" transform="rotate(72)" />
          <ellipse rx="5" ry="3" fill="#C9A39A" transform="rotate(144)" />
          <ellipse rx="5" ry="3" fill="#C9A39A" transform="rotate(216)" />
          <ellipse rx="5" ry="3" fill="#C9A39A" transform="rotate(288)" />
          <circle r="2.2" fill="#C7AF83" />
        </g>
      </svg>
    </div>
  );
}
