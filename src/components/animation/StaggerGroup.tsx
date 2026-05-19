"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

export default function StaggerGroup({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08,
  duration = 0.5,
  y = 20,
  once = true,
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion() === true;

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: shouldReduceMotion
            ? { duration: 0 }
            : { delayChildren, staggerChildren },
        },
      }}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const itemKey = child.key ?? index;

        return (
          <motion.div
            key={itemKey}
            variants={{
              hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
              visible: {
                opacity: 1,
                y: 0,
                transition: shouldReduceMotion
                  ? { duration: 0 }
                  : { duration, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
