type Props = {
  className?: string;
  lines?: number;
};

export function Skeleton({ className = "", lines = 4 }: Props) {
  return (
    <div className={`widget-skeleton ${className}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
