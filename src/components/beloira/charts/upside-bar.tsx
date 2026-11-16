import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

/** Single horizontal bar showing current annual rent against the full-occupancy track. */
export default function UpsideBar({ value, max }: { value: number; max: number }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={[{ name: "Annual office rent", value }]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        aria-hidden="true"
      >
        <XAxis type="number" hide domain={[0, max]} />
        <YAxis type="category" dataKey="name" hide />
        <Bar
          dataKey="value"
          fill="var(--primary)"
          background={{ fill: "var(--border)", radius: 6 }}
          radius={6}
          barSize={28}
          isAnimationActive={!window.matchMedia("(prefers-reduced-motion: reduce)").matches}
          animationDuration={300}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
