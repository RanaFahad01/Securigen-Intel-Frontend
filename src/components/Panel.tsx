import type { ReactNode } from "react";
import classes from "./Panel.module.css";

export function Panel({ children }: { children: ReactNode }) {
  return <div className={classes.panel}>{children}</div>;
}

export function PanelFlush({ children }: { children: ReactNode }) {
  return <div className={classes.panelFlush}>{children}</div>;
}

type PanelHeaderProps = {
  title: string;
  flush?: boolean;
  children?: ReactNode;
};

export function PanelHeader({ title, flush, children }: PanelHeaderProps) {
  return (
    <div className={flush ? classes.panelHeaderFlush : classes.panelHeader}>
      <div className={classes.panelTitle}>{title}</div>
      {children}
    </div>
  );
}

export function PanelMeta({ children }: { children: ReactNode }) {
  return <div className={classes.panelMeta}>{children}</div>;
}

export function PanelMetaInline({ children }: { children: ReactNode }) {
  return <div className={classes.metaInline}>{children}</div>;
}
