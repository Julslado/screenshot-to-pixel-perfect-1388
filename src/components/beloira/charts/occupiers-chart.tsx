import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MARKET } from "@/data/beloira";
import { CenteredWrapTick, ChartTooltip, LABEL_STYLE, reducedMotion } from "./chart-kit";

const data = MARKET.tabs.occupiers.data.map((d) => ({ ...d }));

export default function OccupiersChart() {
  const animate = !reducedMotion();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 24, right: 8, bottom: 0, left: 8 }} barGap={6} accessibilityLayer>
        <XAxis
          dataKey="phase"
          tick={<CenteredWrapTick highlight="Phase 2 (Beloira)" />}
          height={44}
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
          interval={0}
        />
        <YAxis hide domain={[0, 21]} />
        <Tooltip cursor={{ fill: "var(--surface)" }} content={<ChartTooltip unit="%" />} />
        <Bar dataKey="allGrades" name="All grades" fill="var(--border)" radius={[4, 4, 0, 0]} maxBarSize={44} isAnimationActive={animate}>
          {data.map((d) => (
            <Cell key={d.phase} fill="var(--body)" fillOpacity={0.45} />
          ))}
          <LabelList fill="var(--ink)" dataKey="allGrades" position="top" style={LABEL_STYLE} formatter={(v: number) => v.toFixed(1)} />
        </Bar>
        <Bar dataKey="gradeA" name="Grade A/B+" radius={[4, 4, 0, 0]} maxBarSize={44} isAnimationActive={animate}>
          {data.map((d) => (
            <Cell key={d.phase} fill={d.highlight ? "var(--primary)" : "var(--ink)"} />
          ))}
          <LabelList fill="var(--ink)" dataKey="gradeA" position="top" style={LABEL_STYLE} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
