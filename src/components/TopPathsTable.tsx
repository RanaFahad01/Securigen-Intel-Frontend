import { useState } from "react";
import type { PathsResponse } from "../api/types";
import { formatNumber } from "../lib/format";
import { statusColor } from "../lib/status";
import { PanelFlush, PanelHeader, PanelMeta } from "./Panel";
import tableClasses from "./Table.module.css";

const COLUMNS = "34px minmax(0,1fr) 96px 150px 150px 130px";

type SortKey = "path" | "count";
type Sort = { key: SortKey; direction: 1 | -1 };

type Props = {
  paths: PathsResponse;
};

export function TopPathsTable({ paths }: Props) {
  const [sort, setSort] = useState<Sort>({ key: "count", direction: -1 });

  const toggle = (key: SortKey) =>
    setSort((s) => ({
      key,
      direction: s.key === key ? ((-s.direction) as 1 | -1) : key === "path" ? 1 : -1,
    }));

  const indicator = (key: SortKey) => (sort.key === key ? (sort.direction === 1 ? "▴" : "▾") : "");

  const sorted = [...paths.paths].sort((a, b) =>
    sort.key === "path"
      ? a.path.localeCompare(b.path) * sort.direction
      : (a.count - b.count) * sort.direction,
  );
  const top12 = sorted.slice(0, 12);

  return (
    <PanelFlush>
      <PanelHeader title="Most-targeted paths" flush>
        <PanelMeta>top 12</PanelMeta>
      </PanelHeader>
      <div className={tableClasses.headerRow} style={{ gridTemplateColumns: COLUMNS }}>
        <div>#</div>
        <button className={tableClasses.sortButton} onClick={() => toggle("path")}>
          Path {indicator("path")}
        </button>
        <button
          className={tableClasses.sortButton}
          style={{ textAlign: "right" }}
          onClick={() => toggle("count")}
        >
          Count {indicator("count")}
        </button>
        <div>Methods</div>
        <div>Status codes</div>
        <div>Top country</div>
      </div>
      {top12.map((p, i) => (
        <div key={p.path} className={tableClasses.row} style={{ gridTemplateColumns: COLUMNS }}>
          <div className={tableClasses.rank}>{String(i + 1).padStart(2, "0")}</div>
          <div className={`${tableClasses.mono} ${tableClasses.ellipsis}`}>{p.path}</div>
          <div className={`${tableClasses.mono} ${tableClasses.textRight}`}>
            {formatNumber(p.count)}
          </div>
          <div className={tableClasses.badgeRow}>
            {p.methods.map((m) => (
              <span key={m} className={tableClasses.badge}>
                {m}
              </span>
            ))}
          </div>
          <div className={tableClasses.badgeRow}>
            {p.status_codes.map((s) => (
              <span key={s} className={tableClasses.badge} style={{ color: statusColor(s) }}>
                {s}
              </span>
            ))}
          </div>
          <div className={tableClasses.ellipsis} style={{ color: "var(--text-2)" }}>
            {p.top_country ?? "—"}
          </div>
        </div>
      ))}
    </PanelFlush>
  );
}
