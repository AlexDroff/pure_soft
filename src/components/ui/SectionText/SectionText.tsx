import clsx from "clsx";
import styles from "./SectionText.module.css";

type SectionTextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionText({ children, className }: SectionTextProps) {
  return <p className={clsx(styles.text, className)}>{children}</p>;
}
