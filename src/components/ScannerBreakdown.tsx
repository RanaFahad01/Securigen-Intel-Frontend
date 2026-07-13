import type { ScannersResponse } from "../api/types";
import { BarList } from "./BarList";
import { Panel, PanelHeader, PanelMeta } from "./Panel";
import classes from "./ScannerBreakdown.module.css";

type Props = {
  scanners: ScannersResponse;
};

export function ScannerBreakdown({ scanners }: Props) {
  const items = scanners.scanner_types.slice(0, 8).map((s) => ({
    key: s.scanner,
    name: s.scanner,
    count: s.count,
    percentage: s.percentage,
  }));

  return (
    <Panel>
      <PanelHeader title="Scanner breakdown">
        <PanelMeta>by User-Agent signature</PanelMeta>
      </PanelHeader>
      <BarList items={items} barColor="#3A4A5A" mono />
      <div className={classes.footnote}>
        "Other" = no known scanner signature, so browser-like or custom tooling.
      </div>
    </Panel>
  );
}
