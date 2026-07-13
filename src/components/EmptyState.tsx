import classes from "./StatusPanel.module.css";

type Props = {
  onReset: () => void;
};

export function EmptyState({ onReset }: Props) {
  return (
    <div className={classes.panelEmpty}>
      <div className={classes.big}>0</div>
      <div className={classes.title}>No attacks match the current filters</div>
      <div className={classes.subtext}>Try widening the date range or clearing a filter.</div>
      <button className={classes.buttonGhost} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
