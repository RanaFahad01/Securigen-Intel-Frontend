import { useGeo, useScanners } from "../api/hooks";
import type { FilterKey, Filters } from "../lib/filters";
import classes from "./FilterBar.module.css";

const STATUS_OPTIONS = ["200", "401", "403", "404"];

type Props = {
  filters: Filters;
  onChange: (key: FilterKey, value: string | null) => void;
  onReset: () => void;
  active: boolean;
  urlPreview: string;
  total?: number;
};

export function FilterBar({ filters, onChange, onReset, active, urlPreview, total }: Props) {
  const geo = useGeo();
  const scanners = useScanners();

  const countryOptions =
    geo.data?.countries.map((c) => c.country_name).filter((name) => name !== "Unknown") ?? [];
  const scannerOptions = scanners.data?.scanner_types.map((s) => s.scanner) ?? [];

  const handle = (key: FilterKey) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(key, e.target.value === "all" ? null : e.target.value);

  return (
    <div className={classes.bar}>
      <select className={classes.select} value={filters.country ?? "all"} onChange={handle("country")}>
        <option value="all">All countries</option>
        {countryOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <select className={classes.select} value={filters.scanner ?? "all"} onChange={handle("scanner")}>
        <option value="all">All scanners</option>
        {scannerOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <select className={classes.select} value={filters.status ?? "all"} onChange={handle("status")}>
        <option value="all">All statuses</option>
        {STATUS_OPTIONS.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <select className={classes.select} value={filters.range ?? "all"} onChange={handle("range")}>
        <option value="all">All time</option>
        <option value="30d">Last 30 days</option>
        <option value="7d">Last 7 days</option>
      </select>
      {active && (
        <button className={classes.reset} onClick={onReset}>
          Reset
        </button>
      )}
      <div className={classes.right}>
        <div className={classes.url}>{urlPreview}</div>
        {total !== undefined && (
          <div className={classes.count}>{total.toLocaleString("en-US")} requests</div>
        )}
      </div>
    </div>
  );
}
