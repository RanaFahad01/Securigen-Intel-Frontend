import classes from "./StatusPanel.module.css";

type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className={classes.panelError}>
      <div className={classes.title}>Failed to load data from the API</div>
      <div className={classes.code}>{message}</div>
      <div className={classes.subtext}>
        The honeypot API may be restarting. Check VITE_API_BASE_URL or try again.
      </div>
      <button className={classes.buttonAccent} onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
