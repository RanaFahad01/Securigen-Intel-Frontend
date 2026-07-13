import { useHealth } from "../api/hooks";
import classes from "./Header.module.css";


const SOURCE_URL = "https://github.com/RanaFahad01/Securigen-Intel-Frontend";

export function Header() {
  const health = useHealth();

  const up = health.data?.status === "healthy";
  const down = health.isError;
  const label = up ? "api: healthy" : down ? "api: down" : "api: …";

  return (
    <header className={classes.header}>
      <div className={classes.title}>SecuriGen Intelligence</div>
      <div className={classes.subtitle}>
        Live analytics over real attack traffic captured by a self-hosted honeypot
      </div>
      <div className={classes.right}>
        <div className={classes.health}>
          <span
            className={`${classes.dot} ${up ? classes.dotUp : down ? classes.dotDown : ""}`}
          />
          {label}
        </div>
        <a className={classes.source} href={SOURCE_URL} target="_blank" rel="noreferrer">
          source ↗
        </a>
      </div>
    </header>
  );
}
