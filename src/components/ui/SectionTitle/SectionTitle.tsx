// React component 'SectionTitle'. Handles a dedicated UI element and its behavior.
import clsx from "clsx";
import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return <h2 className={clsx(styles.title, className)}>{children}</h2>;
}
