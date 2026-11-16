import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BarTone } from "@/data/beloira";
import { AXIS_TICK, ChartTooltip, LABEL_STYLE, reducedMotion, TONE_FILL } from "./chart-kit";

function wrap(text: string, max = 16) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else line = (line + " " + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function WrappedTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const lines = wrap(payload?.value ?? "");
  const offset = ((lines.length - 1) * 14) / 2;
  return (
    <text x={(x ?? 0) - 8} y={(y ?? 0) - offset} textAnchor="end" dominantBaseline="middle" style={AXIS_TICK}>
      {lines.map((l, i) => (
        <tspan key={l} x={(x ?? 0) - 8} dy={i === 0 ? 0 : 14} fill="var(--body)">
          {l}
        </tspan>
      ))}
    </text>
  );
}

type Row = { name: string; value: number; tone: BarTone };

export default function HorizontalBars({
  data,
  format,
  unit,
  yWidth = 120,
}: {
  data: readonly Row[];
  format: (v: number) => string;
  unit?: string;
  yWidth?: number;
}) {
  const rows = data.map((d) => ({ ...d }));
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={rows}
        margin={{ top: 0, right: 56, bottom: 0, left: 0 }}
        accessibilityLayer
      >
        <XAxis type="number" hide domain={[0, max * 1.05]} />
        <YAxis
          type="category"
          dataKey="name"
          width={yWidth}
          tick={<WrappedTick />}
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
        />
        <Tooltip cursor={{ fill: "var(--surface)" }} content={<ChartTooltip unit={unit} />} />
        <Bar dataKey="value" name="Value" radius={[0, 4, 4, 0]} maxBarSize={36} isAnimationActive={!reducedMotion()}>
          {rows.map((r) => (
            <Cell key={r.name} fill={TONE_FILL[r.tone]} />
          ))}
          <LabelList fill="var(--ink)" dataKey="value" position="right" style={LABEL_STYLE} formatter={format} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
