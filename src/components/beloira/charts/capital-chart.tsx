import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MARKET } from "@/data/beloira";
import { CenteredWrapTick, ChartTooltip, LABEL_STYLE, reducedMotion, TONE_FILL } from "./chart-kit";

const data = MARKET.tabs.capital.data.map((d) => ({ ...d }));

export default function CapitalChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 24, right: 8, bottom: 0, left: 8 }} accessibilityLayer>
        <XAxis dataKey="name" tick={<CenteredWrapTick highlight="Decentralised" />} height={44} tickLine={false} axisLine={{ stroke: "var(--border)" }} interval={0} />
        <YAxis hide domain={[0, 8.5]} />
        <Tooltip cursor={{ fill: "var(--surface)" }} content={<ChartTooltip unit="%" />} />
        <Bar dataKey="value" name="Prime yield" radius={[4, 4, 0, 0]} maxBarSize={56} isAnimationActive={!reducedMotion()}>
          {data.map((d) => (
            <Cell key={d.name} fill={TONE_FILL[d.tone]} />
          ))}
          <LabelList fill="var(--ink)" dataKey="value" position="top" style={LABEL_STYLE} formatter={(v: number) => `${v.toFixed(2)}%`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
