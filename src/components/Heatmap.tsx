import type { HeatmapResponse } from "../api/types";
import { formatNumber } from "../lib/format";
import { Panel, PanelHeader, PanelMeta } from "./Panel";
import classes from "./Heatmap.module.css";

type Props = {
  heatmap: HeatmapResponse;
};

function cellColor(count: number, max: number): string {
  if (count === 0) return "#12171E";
  const alpha = 0.07 + 0.68 * Math.pow(count / max, 0.7);
  return `rgba(0,229,255,${alpha.toFixed(3)})`;
}

export function Heatmap({ heatmap }: Props) {
  const byDay: Record<number, typeof heatmap.cells> = {};
  for (const cell of heatmap.cells) {
    (byDay[cell.day] ??= []).push(cell);
  }
  const max = Math.max(...heatmap.cells.map((c) => c.count), 1);

  return (
    <Panel>
      <PanelHeader title="Attack volume · hour × day of week">
        <PanelMeta>UTC</PanelMeta>
      </PanelHeader>
      <div className={classes.grid}>
        {Object.keys(byDay)
          .map(Number)
          .sort((a, b) => a - b)
          .map((day) => {
            const cells = byDay[day].slice().sort((a, b) => a.hour - b.hour);
            return (
              <div key={day} className={classes.row}>
                <div className={classes.rowLabel}>{cells[0].day_name.slice(0, 3)}</div>
                {cells.map((cell) => (
                  <div
                    key={cell.hour}
                    className={classes.cell}
                    title={`${cell.day_name.slice(0, 3)} ${String(cell.hour).padStart(2, "0")}:00 UTC - ${formatNumber(cell.count)} requests`}
                    style={{ background: cellColor(cell.count, max) }}
                  />
                ))}
              </div>
            );
          })}
        <div className={classes.xAxis}>
          <div className={classes.xAxisSpacer} />
          <div className={classes.xAxisLabels}>
            <div>00</div>
            <div>06</div>
            <div>12</div>
            <div>18</div>
            <div>23</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
