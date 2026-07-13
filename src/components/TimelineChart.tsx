import type { TimelineResponse } from "../api/types";
import { formatNumber, formatShortDate } from "../lib/format";
import { Panel, PanelHeader, PanelMetaInline } from "./Panel";
import classes from "./TimelineChart.module.css";

type Props = {
  timeline: TimelineResponse;
};

export function TimelineChart({ timeline }: Props) {
  const buckets = timeline.buckets;
  const max = Math.max(...buckets.map((b) => b.count), 1);

  const x = (i: number) => ((i / Math.max(buckets.length - 1, 1)) * 800).toFixed(1);
  const y = (count: number) => (208 - (count / max) * 186).toFixed(1);

  const linePath = "M" + buckets.map((b, i) => `${x(i)},${y(b.count)}`).join(" L");
  const areaPath = `${linePath} L800,208 L0,208 Z`;
  const handledPath = "M" + buckets.map((b, i) => `${x(i)},${y(b.handled)}`).join(" L");

  const mid = buckets[Math.floor(buckets.length / 2)];

  return (
    <Panel>
      <PanelHeader title="Attack volume over time">
        <PanelMetaInline>{timeline.granularity} buckets · UTC</PanelMetaInline>
        <div className={classes.legend}>
          <span className={classes.legendItem}>
            <span className={classes.swatch} style={{ background: "var(--accent)" }} />
            total
          </span>
          <span className={classes.legendItem}>
            <span className={classes.swatchDashed} />
            handled (real route)
          </span>
        </div>
      </PanelHeader>
      <div className={classes.body}>
        <div className={classes.yAxis}>
          <div>{formatNumber(max)}</div>
          <div>{formatNumber(Math.round(max / 2))}</div>
          <div>0</div>
        </div>
        <div className={classes.chartCol}>
          <svg viewBox="0 0 800 220" preserveAspectRatio="none" className={classes.svg}>
            <line x1="0" y1="22" x2="800" y2="22" stroke="var(--border)" strokeWidth={1} />
            <line x1="0" y1="115" x2="800" y2="115" stroke="var(--border)" strokeWidth={1} />
            <line x1="0" y1="208" x2="800" y2="208" stroke="var(--border-2)" strokeWidth={1} />
            <path d={areaPath} fill="rgba(0,229,255,0.09)" />
            <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
            <path
              d={handledPath}
              fill="none"
              stroke="var(--green)"
              strokeWidth={1.2}
              strokeDasharray="4 3"
            />
          </svg>
          <div className={classes.xAxis}>
            <div>{buckets[0] && formatShortDate(buckets[0].timestamp)}</div>
            <div>{mid && formatShortDate(mid.timestamp)}</div>
            <div>
              {buckets.length > 0 && formatShortDate(buckets[buckets.length - 1].timestamp)}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
