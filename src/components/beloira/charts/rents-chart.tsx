import { MARKET } from "@/data/beloira";
import HorizontalBars from "./horizontal-bars";

export default function RentsChart() {
  return (
    <HorizontalBars
      data={MARKET.tabs.rents.data}
      format={(v) => `€${v.toFixed(2)}`}
      yWidth={128}
    />
  );
}
