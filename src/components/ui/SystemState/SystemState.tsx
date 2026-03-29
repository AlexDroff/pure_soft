import clsx from "clsx";
import { Container } from "@/components/layout";
import styles from "./SystemState.module.css";

type SystemStateProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SystemState({ children, className }: SystemStateProps) {
  return (
    <main>
      <Container>
        <div className={clsx(styles.wrapper, className)}>{children}</div>
      </Container>
    </main>
  );
}
