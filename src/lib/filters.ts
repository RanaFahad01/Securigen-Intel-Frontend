import { useEffect, useState } from "react";
import type { ApiParams } from "../api/client";

const FILTER_KEYS = ["country", "scanner", "status", "range"] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];
export type Filters = Partial<Record<FilterKey, string>>;

function readFromUrl(): Filters {
  const params = new URLSearchParams(window.location.search);
  const filters: Filters = {};
  for (const key of FILTER_KEYS) {
    const value = params.get(key);
    if (value) filters[key] = value;
  }
  return filters;
}

function writeToUrl(filters: Filters) {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    const value = filters[key];
    if (value) params.set(key, value);
  }
  const query = params.toString();
  history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(readFromUrl);

  useEffect(() => {
    const onPopState = () => setFilters(readFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const set = (key: FilterKey, value: string | null) => {
    const next = { ...filters };
    if (value) {
      next[key] = value;
    } else {
      delete next[key];
    }
    setFilters(next);
    writeToUrl(next);
  };

  const reset = () => {
    setFilters({});
    writeToUrl({});
  };

  const active = FILTER_KEYS.some((key) => filters[key]);
  const urlPreview = active
    ? `/?${new URLSearchParams(filters as Record<string, string>).toString()}`
    : "/";

  return { filters, set, reset, active, urlPreview };
}

function daysBefore(isoDate: string, days: number): string {
  const date = new Date(isoDate);
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

export function toApiParams(filters: Filters, datasetEnd?: string | null): ApiParams {
  let fromDate: string | undefined;
  if (filters.range && datasetEnd) {
    fromDate = daysBefore(datasetEnd, filters.range === "7d" ? 7 : 30);
  }
  return {
    country: filters.country,
    scanner: filters.scanner,
    status: filters.status,
    from_date: fromDate,
  };
}
