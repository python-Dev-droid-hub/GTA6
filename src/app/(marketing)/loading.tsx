export default function Loading() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="h-px w-24 origin-left animate-pulse bg-gradient-neon-edge" />
    </div>
  );
}
