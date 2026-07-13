export interface DateRange {
  from: string | null;
  to: string | null;
}

export interface SummaryResponse {
  total_attacks: number;
  unique_source_ips: number;
  unique_countries: number;
  date_range: DateRange;
  handled_count: number;
  unhandled_count: number;
  coverage_ratio: number;
  top_country: string | null;
  top_scanner: string | null;
  top_path: string | null;
  attacks_per_day_avg: number;
  cve_ids: string[];
}

export interface AttackListItem {
  id: number;
  timestamp: string;
  source_ip: string | null;
  country: string | null;
  method: string;
  path: string;
  query_string: string | null;
  headers: Record<string, string>;
  user_agent: string | null;
  body: string | null;
  status_code: number | null;
  scanner_type: string;
  cve_ids: string[];
}

export interface PageInfo {
  number: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

export interface AttacksListResponse {
  content: AttackListItem[];
  page: PageInfo;
}

export interface CountryStat {
  country_code: string;
  country_name: string;
  count: number;
  percentage: number;
  unique_ips: number;
  top_scanner: string | null;
  top_path: string | null;
}

export interface GeoResponse {
  total_filtered: number;
  countries: CountryStat[];
}

export interface TimelineBucket {
  timestamp: string;
  count: number;
  handled: number;
  unhandled: number;
}

export interface TimelineResponse {
  granularity: "hourly" | "daily";
  total_filtered: number;
  buckets: TimelineBucket[];
}

export interface PathStat {
  path: string;
  count: number;
  percentage: number;
  methods: string[];
  status_codes: number[];
  top_country: string | null;
}

export interface PathsResponse {
  total_filtered: number;
  unique_paths: number;
  paths: PathStat[];
}

export interface ScannerStat {
  scanner: string;
  count: number;
  percentage: number;
  unique_ips: number;
  top_country: string | null;
  top_paths: string[];
}

export interface ScannersResponse {
  total_filtered: number;
  scanner_types: ScannerStat[];
}

export interface HeatmapCell {
  day: number;
  day_name: string;
  hour: number;
  count: number;
}

export interface HeatmapResponse {
  total_filtered: number;
  cells: HeatmapCell[];
}

export interface HealthResponse {
  status: string;
  attacks_loaded: number;
  indexes_built: boolean;
  uptime_seconds: number;
}
