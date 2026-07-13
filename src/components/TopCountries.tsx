import type { GeoResponse } from "../api/types";
import { BarList } from "./BarList";
import { Panel, PanelHeader, PanelMeta } from "./Panel";

type Props = {
  geo: GeoResponse;
};

export function TopCountries({ geo }: Props) {
  const items = geo.countries.slice(0, 8).map((c) => ({
    key: c.country_code,
    name: c.country_name,
    count: c.count,
    percentage: c.percentage,
  }));

  return (
    <Panel>
      <PanelHeader title="Top source countries">
        <PanelMeta>{geo.countries.length} total</PanelMeta>
      </PanelHeader>
      <BarList items={items} barColor="#33586B" />
    </Panel>
  );
}
