import classes from "./BarList.module.css";

export type BarListItem = {
  key: string;
  name: string;
  count: number;
  percentage: number;
};

type Props = {
  items: BarListItem[];
  barColor: string;
  mono?: boolean;
};

export function BarList({ items, barColor, mono }: Props) {
  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <div className={classes.list}>
      {items.map((item) => (
        <div key={item.key} className={classes.row}>
          <div className={mono ? classes.nameMono : classes.name}>{item.name}</div>
          <div className={classes.track}>
            <div
              className={classes.fill}
              style={{ width: `${(item.count / max) * 100}%`, background: barColor }}
            />
          </div>
          <div className={classes.count}>{item.count.toLocaleString("en-US")}</div>
          <div className={classes.pct}>{item.percentage.toFixed(1)}%</div>
        </div>
      ))}
    </div>
  );
}
