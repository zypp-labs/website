type ZyppMarkProps = {
  className?: string;
  /** Pass a title to expose the mark to screen readers; omit for decorative use. */
  title?: string;
};

export default function ZyppMark({ className, title }: ZyppMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 93.89"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        d="M0 0L97.19 0L97.19 3.01L39.58 70.14L100 70.14L100 93.89L24.65 93.89L22.24 90.78L39.58 70.14L6.31 70.14L42.08 27.05L42.08 24.05L0 24.05Z"
        fill="currentColor"
      />
    </svg>
  );
}