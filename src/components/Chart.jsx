import { useMemo } from 'react';

const colors = ['#0ea5e9', '#22c55e', '#f97316', '#a855f7'];

export default function Chart({ title, datasets = [] }) {
  const prepared = useMemo(() => {
    return datasets.map((dataset, index) => ({
      ...dataset,
      color: dataset.color ?? colors[index % colors.length]
    }));
  }, [datasets]);

  const points = prepared.flatMap((dataset) => dataset.data);
  const values = points.map((point) => point.value);
  const years = Array.from(new Set(points.map((point) => point.year))).sort();

  if (points.length === 0) {
    return (
      <div className="rounded-[var(--radius-md)] bg-white/80 p-6 text-sm text-neutral shadow-inner ring-1 ring-primary/10 dark:bg-slate-900/70">
        시각화할 데이터가 없습니다.
      </div>
    );
  }

  const minValue = Math.min(...values) * 0.9;
  const maxValue = Math.max(...values) * 1.1;

  const height = 220;
  const width = 480;
  const marginBottom = 40;

  const getX = (year) => {
    const index = years.indexOf(year);
    return (index / Math.max(years.length - 1, 1)) * width;
  };

  const getY = (value) => {
    return height - ((value - minValue) / (maxValue - minValue)) * height;
  };

  return (
    <figure className="w-full overflow-hidden rounded-[var(--radius-md)] bg-white/80 p-6 shadow-inner ring-1 ring-primary/10 dark:bg-slate-900/70">
      <figcaption className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary/70">
        {title}
      </figcaption>
      <div className="relative" role="img" aria-label={`${title} 지표 시각화`}>
        <svg viewBox={`0 0 ${width} ${height + marginBottom}`} className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="url(#grid)" />
          {prepared.map((dataset) => (
            <polyline
              key={dataset.label}
              fill="none"
              stroke={dataset.color}
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={dataset.data.map((point) => `${getX(point.year)},${getY(point.value)}`).join(' ')}
            />
          ))}
          {years.map((year) => (
            <text
              key={`label-${year}`}
              x={getX(year)}
              y={height + 20}
              textAnchor="middle"
              className="fill-slate-500 text-xs"
            >
              {year}
            </text>
          ))}
        </svg>
        <div className="mt-4 flex flex-wrap gap-3" aria-hidden="true">
          {prepared.map((dataset) => (
            <div key={dataset.label} className="flex items-center gap-2 text-xs text-neutral">
              <span
                className="h-2 w-6 rounded-full"
                style={{ backgroundColor: dataset.color }}
                aria-hidden="true"
              ></span>
              {dataset.label}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
