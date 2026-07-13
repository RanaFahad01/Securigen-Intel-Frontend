import { useGeo, useHeatmap, usePaths, useScanners, useSummary, useTimeline } from "../api/hooks";
import { toApiParams, useFilters } from "../lib/filters";
import { AttackLogTable } from "./AttackLogTable";
import classes from "./Dashboard.module.css";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { FilterBar } from "./FilterBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Heatmap } from "./Heatmap";
import { LoadingState } from "./LoadingState";
import { ScannerBreakdown } from "./ScannerBreakdown";
import { SummaryStats } from "./SummaryStats";
import { TimelineChart } from "./TimelineChart";
import { TopCountries } from "./TopCountries";
import { TopPathsTable } from "./TopPathsTable";

export function Dashboard() {
  const { filters, set, reset, active, urlPreview } = useFilters();

  const dataset = useSummary();
  const params = toApiParams(filters, dataset.data?.date_range.to);
  const granularity = filters.range && filters.range !== "all" ? "hourly" : "daily";

  const summary = useSummary(params);
  const timeline = useTimeline({ ...params, granularity });
  const geo = useGeo(params);
  const scanners = useScanners(params);
  const paths = usePaths({ ...params, limit: 100 });
  const heatmap = useHeatmap(params);

  const isLoading = summary.isLoading;
  const isError = summary.isError;
  const isEmpty = summary.isSuccess && summary.data.total_attacks === 0;
  const showMain =
    !isLoading &&
    !isError &&
    !isEmpty &&
    summary.data &&
    timeline.data &&
    geo.data &&
    scanners.data &&
    paths.data &&
    heatmap.data;

  return (
    <div className={classes.page}>
      <Header />
      <FilterBar
        filters={filters}
        onChange={set}
        onReset={reset}
        active={active}
        urlPreview={urlPreview}
        total={summary.data?.total_attacks}
      />
      <main className={classes.main}>
        {isLoading && <LoadingState />}
        {isError && (
          <ErrorState
            message={summary.error instanceof Error ? summary.error.message : "Request failed"}
            onRetry={() => summary.refetch()}
          />
        )}
        {isEmpty && <EmptyState onReset={reset} />}
        {showMain && (
          <>
            <SummaryStats summary={summary.data} />
            <div className={classes.row32}>
              <TimelineChart timeline={timeline.data} />
              <TopCountries geo={geo.data} />
            </div>
            <div className={classes.row23}>
              <ScannerBreakdown scanners={scanners.data} />
              <Heatmap heatmap={heatmap.data} />
            </div>
            <TopPathsTable paths={paths.data} />
            <AttackLogTable filters={params} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
