import type { SummaryResponse } from "../api/types";
import { formatDateRange, formatNumber } from "../lib/format";
import classes from "./SummaryStats.module.css";

type Props = {
  summary: SummaryResponse;
};

export function SummaryStats({ summary }: Props) {
  return (
    <div className={classes.grid}>
      <div className={classes.card}>
        <div className={classes.label}>Total attacks</div>
        <div className={classes.value}>{formatNumber(summary.total_attacks)}</div>
        <div className={classes.sub}>
          {formatDateRange(summary.date_range.from, summary.date_range.to)}
        </div>
      </div>
      <div className={classes.card}>
        <div className={classes.label}>Unique IPs</div>
        <div className={classes.value}>{formatNumber(summary.unique_source_ips)}</div>
        <div className={classes.sub}>distinct sources</div>
      </div>
      <div className={classes.card}>
        <div className={classes.label}>Countries</div>
        <div className={classes.value}>{formatNumber(summary.unique_countries)}</div>
        <div className={classes.sub}>top: {summary.top_country ?? "—"}</div>
      </div>
      <div className={classes.card}>
        <div className={classes.label}>Coverage ratio</div>
        <div className={`${classes.value} ${classes.accent}`}>
          {(summary.coverage_ratio * 100).toFixed(1)}%
        </div>
        <div className={classes.sub}>requests hitting real routes</div>
      </div>
      <div className={classes.card}>
        <div className={classes.label}>Attacks / day</div>
        <div className={classes.value}>{formatNumber(Math.round(summary.attacks_per_day_avg))}</div>
        <div className={classes.sub}>average over range</div>
      </div>
    </div>
  );
}
