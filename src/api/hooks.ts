import { useQuery } from "@tanstack/react-query";
import { get, type ApiParams } from "./client";
import type {
  AttacksListResponse,
  GeoResponse,
  HealthResponse,
  HeatmapResponse,
  PathsResponse,
  ScannersResponse,
  SummaryResponse,
  TimelineResponse,
} from "./types";

export function useSummary(params: ApiParams = {}) {
  return useQuery({
    queryKey: ["summary", params],
    queryFn: () => get<SummaryResponse>("/summary", params),
  });
}

export function useAttacks(params: ApiParams = {}) {
  return useQuery({
    queryKey: ["attacks", params],
    queryFn: () => get<AttacksListResponse>("/attacks", params),
  });
}

export function useGeo(params: ApiParams = {}) {
  return useQuery({
    queryKey: ["geo", params],
    queryFn: () => get<GeoResponse>("/geo", params),
  });
}

export function useTimeline(params: ApiParams = {}) {
  return useQuery({
    queryKey: ["timeline", params],
    queryFn: () => get<TimelineResponse>("/timeline", params),
  });
}

export function usePaths(params: ApiParams = {}) {
  return useQuery({
    queryKey: ["paths", params],
    queryFn: () => get<PathsResponse>("/paths", params),
  });
}

export function useScanners(params: ApiParams = {}) {
  return useQuery({
    queryKey: ["scanners", params],
    queryFn: () => get<ScannersResponse>("/scanners", params),
  });
}

export function useHeatmap(params: ApiParams = {}) {
  return useQuery({
    queryKey: ["heatmap", params],
    queryFn: () => get<HeatmapResponse>("/heatmap", params),
  });
}

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => get<HealthResponse>("/health"),
    refetchInterval: 30_000,
  });
}
