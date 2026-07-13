import { useState } from "react";
import { useAttacks } from "../api/hooks";
import type { ApiParams } from "../api/client";
import { formatNumber, formatTimestamp } from "../lib/format";
import { statusColor } from "../lib/status";
import { PanelFlush, PanelHeader, PanelMeta } from "./Panel";
import tableClasses from "./Table.module.css";
import classes from "./AttackLogTable.module.css";

const COLUMNS = "150px 128px 106px 58px minmax(0,1fr) 52px 118px 22px";
const PAGE_SIZE = 15;

type SortKey = "timestamp" | "country" | "status_code";

function formatHeaders(headers: Record<string, string>): string {
  const entries = Object.entries(headers);
  if (entries.length === 0) return "—";
  return entries.map(([key, value]) => `${key}: ${value}`).join("\n");
}

type Props = {
  filters: ApiParams;
};

export function AttackLogTable({ filters }: Props) {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>({
    key: "timestamp",
    direction: "desc",
  });
  const [expanded, setExpanded] = useState<number | null>(null);

  const attacks = useAttacks({
    ...filters,
    page,
    size: PAGE_SIZE,
    sort: sort.key,
    order: sort.direction,
  });

  const toggleSort = (key: SortKey) => {
    setSort((s) => ({
      key,
      direction: s.key === key ? (s.direction === "asc" ? "desc" : "asc") : key === "timestamp" ? "desc" : "asc",
    }));
    setPage(0);
    setExpanded(null);
  };

  const indicator = (key: SortKey) =>
    sort.key === key ? (sort.direction === "asc" ? "▴" : "▾") : "";

  if (!attacks.data) return null;

  const { content, page: pageInfo } = attacks.data;

  return (
    <PanelFlush>
      <PanelHeader title="Raw attack log" flush>
        <PanelMeta>click a row to expand request detail</PanelMeta>
      </PanelHeader>
      <div className={tableClasses.headerRow} style={{ gridTemplateColumns: COLUMNS }}>
        <button className={tableClasses.sortButton} onClick={() => toggleSort("timestamp")}>
          Timestamp {indicator("timestamp")}
        </button>
        <div>Source IP</div>
        <button className={tableClasses.sortButton} onClick={() => toggleSort("country")}>
          Country {indicator("country")}
        </button>
        <div>Method</div>
        <div>Path</div>
        <button className={tableClasses.sortButton} onClick={() => toggleSort("status_code")}>
          Status {indicator("status_code")}
        </button>
        <div>Scanner</div>
        <div />
      </div>
      {content.map((row) => {
        const open = expanded === row.id;
        return (
          <div key={row.id}>
            <div
              className={tableClasses.row}
              style={{ gridTemplateColumns: COLUMNS, cursor: "pointer" }}
              onClick={() => setExpanded(open ? null : row.id)}
            >
              <div className={`${tableClasses.mono}`} style={{ color: "var(--muted)", fontSize: 11 }}>
                {formatTimestamp(row.timestamp)}
              </div>
              <div className={tableClasses.mono}>{row.source_ip ?? "—"}</div>
              <div className={`${tableClasses.ellipsis}`} style={{ color: "var(--text-2)" }}>
                {row.country ?? "—"}
              </div>
              <div className={tableClasses.mono} style={{ color: "var(--muted)", fontSize: 11 }}>
                {row.method}
              </div>
              <div className={`${tableClasses.mono} ${tableClasses.ellipsis}`}>
                {row.path}
                {row.query_string ? `?${row.query_string}` : ""}
              </div>
              <div className={tableClasses.mono} style={{ color: statusColor(row.status_code ?? 0) }}>
                {row.status_code ?? "—"}
              </div>
              <div
                className={`${tableClasses.mono} ${tableClasses.ellipsis}`}
                style={{ color: "var(--muted)", fontSize: 11 }}
              >
                {row.scanner_type}
              </div>
              <div className={classes.chevron}>{open ? "▾" : "▸"}</div>
            </div>
            {open && (
              <div className={classes.detail}>
                <div>
                  <div className={classes.detailLabel}>Request headers</div>
                  <pre className={classes.pre}>{formatHeaders(row.headers)}</pre>
                </div>
                <div className={classes.detailStack}>
                  <div>
                    <div className={classes.detailLabel}>Query string</div>
                    <pre className={classes.pre}>{row.query_string ?? "—"}</pre>
                  </div>
                  <div>
                    <div className={classes.detailLabel}>Body</div>
                    <pre className={classes.pre}>{row.body ?? "—"}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className={tableClasses.footerRow}>
        <button
          className={tableClasses.pageButton}
          disabled={pageInfo.number === 0}
          onClick={() => {
            setPage((p) => Math.max(0, p - 1));
            setExpanded(null);
          }}
        >
          ‹ Prev
        </button>
        <button
          className={tableClasses.pageButton}
          disabled={pageInfo.number >= pageInfo.total_pages - 1}
          onClick={() => {
            setPage((p) => Math.min(pageInfo.total_pages - 1, p + 1));
            setExpanded(null);
          }}
        >
          Next ›
        </button>
        <div className={tableClasses.pageInfo}>
          Page {formatNumber(pageInfo.number + 1)} of {formatNumber(pageInfo.total_pages)} ·{" "}
          {formatNumber(pageInfo.total_elements)} requests
        </div>
      </div>
    </PanelFlush>
  );
}
