import classes from "./LoadingState.module.css";

export function LoadingState() {
  return (
    <div className={classes.wrap}>
      <div className={classes.statsGrid}>
        {[60, 55, 65, 58, 62].map((w, i) => (
          <div key={i} className={classes.card}>
            <div className={classes.barLabel} style={{ width: `${w}%` }} />
            <div className={classes.barValue} style={{ width: `${w - 15}%` }} />
          </div>
        ))}
      </div>
      <div className={classes.chartsRow}>
        <div className={classes.chartCard}>
          <div className={classes.chartTitle} style={{ width: 180 }} />
          <div className={classes.chartBody} />
        </div>
        <div className={classes.chartCard}>
          <div className={classes.chartTitle} style={{ width: 140 }} />
          <div className={classes.chartBody} />
        </div>
      </div>
      <div className={classes.wideCard}>
        <div className={classes.chartTitle} style={{ width: 160 }} />
        <div className={classes.wideBody} />
      </div>
      <div className={classes.status}>fetching /summary · /timeline · /geo · /scanners · /heatmap …</div>
    </div>
  );
}
