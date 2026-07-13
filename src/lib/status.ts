export function statusColor(status: number): string {
  if (status >= 200 && status < 300) return "var(--green)";
  if (status === 401 || status === 403) return "var(--amber)";
  return "var(--red)";
}
