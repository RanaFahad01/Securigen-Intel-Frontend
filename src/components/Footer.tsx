import classes from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.note}>
        SecuriGen Intelligence, a portfolio project. Data collected by a self-hosted honeypot,
        Mar - Jul 2026.
      </div>
      <div className={classes.stack}>React 19 · TypeScript · Mantine · FastAPI</div>
    </footer>
  );
}
